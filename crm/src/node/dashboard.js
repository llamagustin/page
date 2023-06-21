const { Router }  = require("express");
const routerDashboard = Router();



const Sequelize = require("sequelize");
const config = require("./config.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const {
  sql_data_analytics,
  sql_data_salesOverview,
  sql_statisticsVertical,
  sql_earningsReports,
  sql_supportTracker,
} = require('./fn_dashboard.js')



const {
  sql_leadsActive,
  sql_simpleStatisticsDemoCards,
  sql_leadsRevenueDiary_series,
  sql_leadsServicesStates_series,
  sql_leadsServices_series,
  sql_leadsAnalyticsSales_series,
  sql_leadsActive_series
} = require('./fn_dashboard.js')




//ACCOUNTS
const getDashboardAccount = async (req, res) => {
  const res_data_analytics = await new Promise((resolve, reject) => {
    sequelize.query(sql_data_analytics).then(result => {
        resolve(result[0][0].service_count)
      });
      
  })

  const res_data_salesOverview = await new Promise((resolve, reject) => {
    sequelize.query(sql_data_salesOverview).then(result => {
        resolve(result[0])
      });
  })
  
  
  const res_data_statisticsVertical = await new Promise((resolve, reject) => {
    sequelize.query(sql_statisticsVertical).then(result => {
        resolve(result[0])
      });
  })
  
  const res_data_earningsReports = await new Promise((resolve, reject) => {
    // sequelize.query(sql_earningsReports).then(result => {
    //     resolve(result[0][0])
    //   });
    resolve([])
  })
  
  const res_data_supportTracker = await new Promise((resolve, reject) => {
    sequelize.query(sql_supportTracker).then(result => {
      resolve(result[0])
    });
  })
  
  
  // console.log('add', res_data_earningsReports)
  
  
  //
  var data = {
    analytics: {
      web: {
        accepted: res_data_analytics?.crm.accepted || 0,
        pending: res_data_analytics?.crm.accepted || 0,
        totalMoney: res_data_analytics?.crm.accepted || 0,
        pendingMoney: res_data_analytics?.crm.accepted || 0
      },
      shop: {
        accepted: res_data_analytics?.shop.accepted || 0,
        pending: res_data_analytics?.shop.accepted || 0,
        totalMoney: res_data_analytics?.shop.accepted || 0,
        pendingMoney: res_data_analytics?.shop.accepted || 0
      },
      seo: {
        accepted: res_data_analytics?.seo.accepted || 0,
        pending: res_data_analytics?.seo.accepted || 0,
        totalMoney: res_data_analytics?.seo.accepted || 0,
        pendingMoney: res_data_analytics?.seo.accepted || 0
      },
      rrss: {
        accepted: res_data_analytics?.rrss.accepted || 0,
        pending: res_data_analytics?.rrss.accepted || 0,
        totalMoney: res_data_analytics?.rrss.accepted || 0,
        pendingMoney: res_data_analytics?.rrss.accepted || 0
      },
      crm: {
        accepted: res_data_analytics?.crm.accepted || 0,
        pending: res_data_analytics?.crm.accepted || 0,
        totalMoney: res_data_analytics?.crm.accepted || 0,
        pendingMoney: res_data_analytics?.crm.accepted || 0
      },
      office: {
        accepted: res_data_analytics?.office.accepted || 0,
        pending: res_data_analytics?.office.accepted || 0,
        totalMoney: res_data_analytics?.office.accepted || 0,
        pendingMoney: res_data_analytics?.office.accepted || 0
      }
    },
    salesOverview: {
      stats: res_data_salesOverview?.stats || '0%',
      sell: {
        data: res_data_salesOverview?.sell?.data || '0%',
        total: res_data_salesOverview?.sell?.total || '0.00€'
      },
      pendent: {
        data: res_data_salesOverview?.sell?.data || '0%',
        total: res_data_salesOverview?.sell?.total || '0.00€'
      }
    },
    statisticsVertical: {
      stats:  res_data_statisticsVertical?.stats || '0'
    },
    earningsReports: {
      total: res_data_earningsReports?.total || '0',
      stats: parseFloat(res_data_earningsReports?.stats || 0) + '%',
      data: [10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // series: res_data_earningsReports?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      gain: {
        amount: res_data_earningsReports?.gain_amount || '0',
        progres: res_data_earningsReports?.gain_progres || '0'
      },
      pendent: {
        amount: res_data_earningsReports?.pendent_amount || '0',
        progres: res_data_earningsReports?.pendent_progres || '0'
      },
      cancelled: {
        amount: res_data_earningsReports?.cancelled_amount || '0',
        progres: res_data_earningsReports?.cancelled_progres || '0'
      }
    },
    supportTracker: {
      data: 0,
      total: 0,
      completed: 80,
      support: [
        '0',
        '0',
        '0 Days'
        ]
    },
    monthlyCampaign: {
      emails: {
        count: '0',
        stats: '0%'
        },
      opened: {
        count: '0',
        stats: '0%'
        },
      clicked: {
        count: '0',
        stats: '0%'
        },
      suscribed: {
        count: '0',
        stats: '0%'
        },
      reclaimed: {
        count: '0',
        stats: '0%'
        },
      nonsuscribed: {
        count: '0',
        stats: '0%'
        }
    },
    accountWhitdrawal: [
      {
        // cardImg: visaIcon,
        lastDigit: '*4230',
        cardType: 'Credit',
        sentDate: '17 Mar 2022',
        status: 'Verified',
        trend: '+$1,678',
      }
    ]
  
    
  }
  
  
  
  return res.send(data)
}




//LEADS
const getDashboardLead = async (req, res) => {
  const res_leadsActive = await new Promise((resolve, reject) => {
    sequelize.query(sql_leadsActive).then(result => {
        resolve(result[0][0])
      });
  })
  
  
  const res_simpleStatisticsDemoCards = await new Promise((resolve, reject) => {
    sequelize.query(sql_simpleStatisticsDemoCards).then(result => {
        resolve(result[0][0])
      });
  })
  
  const res_leadsRevenueDiary_series = await new Promise((resolve, reject) => {
    sequelize.query(sql_leadsRevenueDiary_series).then(result => {
        resolve(result[0])
      });
  })
  
  const res_leadsServicesStates_series = await new Promise((resolve, reject) => {
    // sequelize.query(sql_leadsServicesStates_series).then(result => {
    //     resolve(result[0][0])
    //   });
    resolve([])
  })
  
  const res_leadsServices_series = await new Promise((resolve, reject) => {
    // sequelize.query(sql_leadsServices_series).then(result => {
    //   resolve(result[0][0])
    // });
    resolve([])
  })
  
  
  
  const res_leadsAnalyticsSales_series = await new Promise((resolve, reject) => {
    // sequelize.query(sql_leadsAnalyticsSales_series).then(result => {
    //   // console.log('rr', result[0][0])
    //   resolve(result[0][0])
    // });
    resolve([])
  })
  
  // const res_leadsActive_series = await new Promise((resolve, reject) => {
  //   sequelize.query(sql_leadsActive_series).then(result => {
  //     resolve(result[0])
  //   });
  // })
  

  var data = {
    leadsActive: {
      name: '', //front
      email: '', //front
      total: res_leadsActive.total_sum || 0
    },
    simpleStatisticsDemoCards: {
      stat: res_leadsActive.total_sum || '0.00€'
    },
    leadsRevenueDiary_series: {
      total: res_leadsRevenueDiary_series.total_sum || '0.00€',
      rate: '0%',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    leadsServicesStates_series: res_leadsServicesStates_series || {
      web: '0',
      shop: '0',
      seo: '0',
      office: '0',
      crm: '0',
      rrss: '0'
    },
    leadsServices_series: res_leadsServices_series || {
      web: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      shop: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      seo: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      office: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      crm: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      rrss: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    leadsAnalyticsSales_series: res_leadsAnalyticsSales_series || {
      total: [0, 0, 0, 0, 0, 0],
      individual: [0, 0, 0, 0, 0, 0]
    },
    leadsWhitdrawal_series: [
      {
        // cardImg: visaIcon,
        lastDigit: '*4230',
        cardType: 'Credit',
        sentDate: '17 Mar 2022',
        status: 'Verified',
        trend: '+$1,678',
      }
    ]
  }
  
  return res.status(200).send(data)
}



// DASHBOARD
const getToolsWithCounts = async (req, res) => {
  try {
    const queryLeadsAccepted = `
      SELECT COUNT(*) as count FROM aythen.users as users WHERE users.status = 200
    `
    const [ numberLeads ] = await sequelize.query(queryLeadsAccepted)
    
    return res.status(200).json({
      numberLeads: numberLeads[0]
    })
  } catch (error) {
    console.log({ error })
    return res.sendStatus(404)
  }
}




// ROUTE LIST
routerDashboard.get('/account', getDashboardAccount)
routerDashboard.get('/lead', getDashboardLead)


routerDashboard.get('/get-tools-with-counts', getToolsWithCounts)




module.exports = routerDashboard;