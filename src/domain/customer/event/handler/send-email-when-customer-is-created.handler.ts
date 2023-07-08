import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: any): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
  }
}
