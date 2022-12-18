import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get a recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientIds = ['recipient-1', 'recipient-1', 'recipient-2'];

    const [recipientIdTest] = recipientIds;

    const promises = recipientIds.map(async (recipientId) => {
      const notification = makeNotification({ recipientId });
      await notificationsRepository.create(notification);
    });

    await Promise.all(promises);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientIdTest,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientIdTest }),
        expect.objectContaining({ recipientId: recipientIdTest }),
      ]),
    );
  });
});
