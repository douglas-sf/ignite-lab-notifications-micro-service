import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const promises = ['recipient-1', 'recipient-1', 'recipient-2'].map(
      async (recipientId) => {
        const notification = makeNotification({ recipientId });
        await notificationsRepository.create(notification);
      },
    );

    await Promise.all(promises);

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
