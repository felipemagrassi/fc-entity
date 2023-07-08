export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _city: string = "";
  private _zipcode: string = "";

  constructor(street: string, number: number, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;

    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zipcode.length === 0) {
      throw new Error("Zip code is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  get street(): string {
    return this._street;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get number(): number {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zipcode}`;
  }
}
