import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class AddNewAddressToStoreHandler
  implements EventHandlerInterface
{
  handle(event: any): void {
    console.log(
      `Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${event.eventData.address}`
    );
  }
}
