Hooks.on('init', () => {
  // notifications are not yet set
  Object.defineProperty(ui, 'notifications', {
    configurable: true,
    get: () => undefined,
    set: (notifications: Notifications) => {
      // Hook to ignore the error
      let errorPrefix = (game as Game).i18n!.localize("ERROR.LowResolution");
      errorPrefix = errorPrefix.substring(0, errorPrefix.indexOf('{'))
      const originalError = notifications.error;
      notifications.error = function(this: Notifications, ...args: any[]) {
        const message: string = args[0];
        if (message.startsWith(errorPrefix)) {
          notifications.error = originalError;
          return;
        }
        return originalError.apply(this, args);
      }

      Object.defineProperty(ui, 'notifications', {
        configurable: true,
        value: notifications,
      })
    }
  })
});