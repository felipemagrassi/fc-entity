import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: any): void {
    console.log(`Sending email to ${event.eventData.email}...`);
  }
}
