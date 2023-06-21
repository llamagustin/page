const makeCall = (req, res) => {
    
    client.calls.create({
        //url: 'http://demo.twilio/docs/voice.xml',
        twiml: '<Response><Say>Hola Carlos Valle ha ganado un premio quiere solicitarlo ahora.</Say></Response>',
        to: '34667283537',
        from: '18186479935'
    }, function(err, call){
        if(err){
            res.send(err)
        }else{
            res.send(call)
        }
    })
}


const answerCall = (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hola como estás? Quiero decirle que tengo ganas de realizar una llamada apunto');
    
    res.type('text/xml');
    res.send(twiml.toString())
}


const recordCall = (req, res) => {
    // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  //twiml.say('Hola, deja tu mensaje despues del piii.');
  
  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  // Use <Record> to record the caller's message
  //twiml.record();
  twiml.record({ transcribe: true, maxLength: 30 });

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  
  var text = twiml.toString()
  console.log('r', text)
  res.send(text);
}



const obtainPSTN = (req, res) => {
    client.usage.records.list({category: 'pstnconnectivity', limit: 20})
    .then(records => records.forEach(r => {
        console.log(r.asOf)
    }));
}



const createToken = (req, res) => {
    /*
    const chatGrant = new ChatGrant({
      serviceSid: twilioServiceSid,
    });
    */
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twilioAppSid,
      incomingAllow: true // allows your client-side device to receive calls as well as make them
    });


    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {identity: identity}
    );
    
    token.addGrant(voiceGrant);
    
    return res.send( token.toJwt() )
}






/*
https://www.twilio.com/es-mx/docs/voice/queue-calls

TaskRouter
https://www.twilio.com/docs/taskrouter/twiml-queue-calls

asignar agentes disponibles al siguiente agente de llamada en la cola;
ofrecer planes de asistencia técnica escalonados, que permiten a los clientes prémium saltarse la cola;
dirigir a ciertos agentes de llamada a diferentes equipos basados en la lógica empresarial.
*/

const twilioWorkspace = async (req, res) => {
    const { workspace } = req.body
    
    client.taskrouter.workspaces.create({friendlyName: workspace})
    .then(response => {
        console.log(response.sid);
        
        return res.send(response)
    }).catch(err => {
       return res.send(err)
    })
}


const twilioFetchWorkspace = async (req, res) => {
    const { workspace } = req.body
    
    client.taskrouter.workspaces.list({friendlyName: workspace})
    .then(workspaces => {
        if(workspaces.length>0){
            return res.send(workspaces[0])
        }else{
            return res.send('404')
        }
    });
}


const twilioListWorkspace = async (req, res) => {
    client.taskrouter.workspaces.list()
    .then(workspaces => {
        return res.send(workspaces)
    });
}
    
const twilioDeleteWorkspace = async (req, res) => {
   const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    })
    
    client.taskrouter.v1.workspaces(sid).remove()
    .then(response => {
        console.log('Workspace deleted');
        return res.send(response)
    }).catch(err => {
        return res.send(err)
    })
}
    
    
    
    
    





const twilioAddWorker = async (req, res) => {
    const { workspace, worker, attributes } = req.body
    
    //'{"type":"support"}'
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    })
    
    console.log('s', sid)
    
    client.taskrouter.workspaces(sid).workers
    .create({friendlyName: worker, attributes: attributes})
    .then(worker => {
        //console.log(worker.sid);
        return res.send(worker)
    });
}

const twilioDeleteWorker = async (req, res) => {
  const { workspace, worker } = req.body

  var sid = await new Promise((resolve, reject) => {
     client.taskrouter.workspaces.list({friendlyName: workspace})
    .then(workspaces => {
        if(workspaces.length>0){
            resolve(workspaces[0].sid)
        }else{
            return res.send('404')
        }
    });
  })
  
  
  var _sid = await new Promise((resolve, reject) => {
    client.taskrouter.workspaces(sid).workers.list({friendlyName: worker})
    .then(workers => {
        if(workers.length>0){
            resolve(workers[0].sid)
        }else{
            return res.send('404')
        }
    });
  })
  
  client.taskrouter.workspaces(sid).workers(_sid).remove()
    .then(worker => {
        return res.send(worker)
    });
}

const twilioFetchWorker = async (req, res) => {
    const { workspace, worker } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
      
    client.taskrouter.workspaces(sid).workers.list({friendlyName: worker})
    .then(workers => {
        if(workers.length>0){
            return res.send(workers[0])
        }else{
            return res.send('404')
        }
    });
}

const twilioListWorker = async (req, res) => {
  const { workspace } = req.body
  
  var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    
  client.taskrouter.workspaces(sid).workers.list()
    .then(workers => {
        return res.send(workers)
    });
}

    



const twilioAddTask = async (req, res) => {
    const { workspace, task } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid)
    .taskQueues.create(task)
    .then(task_queue => {
        return res.send(task_queue)
    });
}


const twilioListTask = async (req, res) => {
    const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid)
      .taskQueues
      .list({limit: 20})
      .then(taskQueues => {
        return res.send(taskQueues)
      });
}   
      
const twilioFetchTask = async (req, res) => {
    const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid)
      .taskQueues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      .fetch()
      .then(task_queue => {
        return res.send(task_queue)
      }).catch(err => {
        return res.send(err)
      })
}

const twilioDeleteTask = async (req, res) => {
    const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid)
      .taskQueues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      .remove().then(response => {
        return res.send(response)
      }).catch(err => {
        return res.send(err)
      })
}




const twilioAddActivity = async (req, res) => {
    const { workspace, activity } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid).activities
      .create({
         friendlyName: activity,
         available: true
      })
      .then(activity => {
        return res.send(activity)
      });
}







const twilioListActivity = async (req, res) => {
    const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid).taskQueues.list({limit: 20})
      .then(taskQueues => {
        return res.send(taskQueues)
      });
}   
      
const twilioFetchActivity = async (req, res) => {
    const { workspace, activity } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    client.taskrouter.v1.workspaces(sid)
    .activities.list({friendlyName: activity})
    .then(activities => {
       return res.send(activities)
    }).catch(err => {
        return res.send(err)
      })
}

const twilioDeleteActivity = async (req, res) => {
    const { workspace, activity } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    var _sid = await new Promise((resolve, reject) => {
      client.taskrouter.v1.workspaces(sid)
      .activities.list({friendlyName: activity})
      .then(activities => {
         if(activities.length>0){
              resolve(activities[0].sid)
          }else{
              return res.send('404')
          }
      }).catch(err => {
          return res.send(err)
        })
    }) 
    
    
  
    client.taskrouter.v1.workspaces(sid)
      .taskQueues(_sid)
      .remove().then(response => {
        return res.send(response)
      }).catch(err => {
        return res.send(err)
      })
}





const twilioQueque = async (req, res) => {
    const { workspace, queque } = req.body
    
    
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    

    client.taskrouter.workspaces(sid).queues.create({friendlyName: queque})
    .then(queue => {
        return res.send(queue)         
    }).catch( err => {
        return res.send(err)
    })
}


const twilioFetchQueque = async (req, res) => {
    const { workspace, queque } = req.body
    
    console.log('w', workspace)

    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    }) 
    
    console.log('sid', sid)
    
    client.taskrouter.workspaces(sid).queues.list({friendlyName: queque})
      .then(queues => {
        if(queues.length){
             return res.send(queues[0])
        }else{
            return res.send('404')
        }
      })
      .catch(err => {
        return res.send(err)
      });
}

const twilioListQueque = async (req, res) => {
  const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    })  
    
    
    client.taskrouter.workspaces(sid).queues.list().then(queue => {
        return res.send(queue)         
    }).catch( err => {
        return res.send(err)
    })
}


const twilioDeleteQueque = async (req, res) => {
    const { workspace, queque } = req.body
    
    
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces(sid).queues.list({friendlyName: queque})
      .then(queues => {
        if(queues.length){
            resolve(queues[0].sid)
        }else{
            return res.send('404')
        }
      })
      .catch(err => {
        return res.send(err)
      });
    })
    
    client.taskrouter.workspaces(sid).queues(sid).remove().then(queue => {
        return res.send(queue)         
    }).catch( err => {
        return res.send(err)
    })
}




const twilioEnqueque = async (req, res) => {
    const { workspace, queque } = req.body
    
    const response = new VoiceResponse();
    
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    })  
    
    
    var _sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces(sid).queues.list({friendlyName: queque})
      .then(queues => {
        if(queues.length){
            resolve(queues[0].sid)
        }else{
            return res.send('404')
        }
      })
      .catch(err => {
        return res.send(err)
      });
    })
    

    response.enqueue({
        waitUrl: 'https://api.aythen.com/static/src/node/wait-music.xml'
    }, _sid );
    
    //console.log('r', response)
    res.send(response.toString())
    
}


const twilioDialing1 = async (req, res) => {
  const { workspace } = req.body
  
    var sid = await new Promise((resolve, reject) => {
       client.taskrouter.workspaces.list({friendlyName: workspace})
      .then(workspaces => {
          if(workspaces.length>0){
              resolve(workspaces[0].sid)
          }else{
              return res.send('404')
          }
      });
    })  
    
    
    client.taskrouter.workspaces(sid).workers
    .list({available: true, limit: 1})
    .then(workers => {
      console.log('work', workers)
        if(workers.length > 0){
            const worker = workers[0];
            const twiml = new twilio.twiml.VoiceResponse();
            twiml.dial(worker.contact_uri);
            res.set('Content-Type', 'text/xml');
            res.send(twiml.toString());
        } else {
            // Handle the case when no available agents are found
        }
    });
}




const twilioDialing = async (req, res) => {
    const { queque } = req.body
    
    const response = new VoiceResponse();
    const dial = response.dial();
    dial.queue({
        url: 'about_to_connect.xml'
    }, queque);
    
    return res.send(response)
}


const twilioNextCaller = async (req, res) => {
    const twiml = new VoiceResponse();
    
    twiml.say('You will now be connected to the first caller in the queue.');
    
    const dial = twiml.dial();
    dial.queue('Queue Demo');
    
    twiml.redirect();
    
    //console.log(twiml.toString());
    return res.send(twiml)
}

