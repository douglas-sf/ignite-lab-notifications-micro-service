import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientIds = ['recipient-1', 'recipient-1', 'recipient-2'];

    const promises = recipientIds.map(async (recipientId) => {
      const notification = makeNotification({ recipientId });
      await notificationsRepository.create(notification);
    });

    await Promise.all(promises);

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientIds[0],
    });

    const amount = recipientIds.filter(
      (item) => item === recipientIds[0],
    ).length;

    expect(count).toEqual(amount);
  });
});
