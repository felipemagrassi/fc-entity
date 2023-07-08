import EventDispatcher from "../event/@shared/event-dispatcher";
import EventInterface from "../event/@shared/event.interface";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import AddNewAddressToStoreHandler from "../event/customer/handler/add-new-address-to-store.handler";
import AddNewCustomerToThirdPartyApiHandler from "../event/customer/handler/add-new-customer-to-third-party-api.handler";
import SendEmailWhenCustomerIsCreatedHandler from "../event/customer/handler/send-email-when-customer-is-created.handler";
import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher = new EventDispatcher();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get Address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required to activate customer");
    }
    this._active = true;
  }

  create() {
    const event = new CustomerCreatedEvent(this);
    const eventHandlers = [
      new AddNewCustomerToThirdPartyApiHandler(),
      new SendEmailWhenCustomerIsCreatedHandler(),
    ];

    eventHandlers.forEach((handler) => {
      this._eventDispatcher.register("CustomerCreatedEvent", handler);
    });

    this.apply(event);
  }

  private apply(event: EventInterface) {
    this._eventDispatcher.notify(event);
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  setAddress(address: Address) {
    const eventHandler = new AddNewAddressToStoreHandler();

    this._eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    this._address = address;

    const event = new CustomerAddressChangedEvent({customer: this, address: this.Address})

    this.apply(event);
  }

  isActive(): boolean {
    return this._active;
  }
}
