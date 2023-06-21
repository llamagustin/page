self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache-name')
    .then(function(cache) {
        console.log('wfrwijju')
      return cache.addAll([
        '/index.html'
      ]);
    })
  );
});



 self.addEventListener('fetch',() => { 
    //  console.log('2') 
 });

// Handle incoming push notifications
self.addEventListener('push', function(event) {
    // console.log('e', event)
    event.waitUntil(
        self.registration.pushManager.getSubscription()
            .then(function(subscription) {
                // console.log('ssss', subscription)
                // Show a notification with the retrieved title and body
                const title = 'Ejemplo de notificación push';
                  const options = {
                    body: 'Esta es una notificación push de ejemplo.',
                    icon: '/assets/icons/icon-192x192.png',
                    badge: '/assets/icons/icon-192x192.png'
                  };
                
                  event.waitUntil(self.registration.showNotification(title, options));
  
                        // return self.registration.showNotification('hell world', {
                        //     body: 'pleas please',
                        //     // icon: icon,
                        //     tag: 'ee'
                        // });
                /*
                // Retrieve the notification's title and body from the server
                return fetch('/get-notification-data')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        var title = data.title;
                        var body = data.body;
                        var icon = data.icon;
                        var tag = data.tag;
                        // Show a notification with the retrieved title and body
                        return self.registration.showNotification(title, {
                            body: body,
                            icon: icon,
                            tag: tag
                        });
                    });
                    */
            })
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://example.com')
    );
});