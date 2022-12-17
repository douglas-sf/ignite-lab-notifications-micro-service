import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('This is a notification'),
    category: 'social',
    recipientId: 'test-recipient-id',
    ...override,
  });
}
