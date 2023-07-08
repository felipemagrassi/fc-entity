import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import AddNewAddressToStoreHandler from "./add-new-address-to-store.handler";

describe("AddNewAddressToStoreHandler", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should send email when creating a customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
    const event = new CustomerAddressChangedEvent({ customer, address });

    const eventDispatcher = new EventDispatcher();
    const handler = new AddNewAddressToStoreHandler();
    const spy = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", handler);
    eventDispatcher.notify(event);

    expect(spy).toHaveBeenCalledWith(event);
    expect(console.log).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado para: ${address.toString()}`
    );
  });
});
