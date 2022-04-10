// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Land extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("landId", Value.fromBigInt(BigInt.zero()));
    this.set("plotCoords", Value.fromString(""));
    this.set("area", Value.fromBigInt(BigInt.zero()));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("status", Value.fromI32(0));
    this.set("updatedAt", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Land entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Land must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Land", id.toString(), this);
    }
  }

  static load(id: string): Land | null {
    return changetype<Land | null>(store.get("Land", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get landId(): BigInt {
    let value = this.get("landId");
    return value!.toBigInt();
  }

  set landId(value: BigInt) {
    this.set("landId", Value.fromBigInt(value));
  }

  get plotCoords(): string {
    let value = this.get("plotCoords");
    return value!.toString();
  }

  set plotCoords(value: string) {
    this.set("plotCoords", Value.fromString(value));
  }

  get area(): BigInt {
    let value = this.get("area");
    return value!.toBigInt();
  }

  set area(value: BigInt) {
    this.set("area", Value.fromBigInt(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get verifiedBy(): Bytes | null {
    let value = this.get("verifiedBy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set verifiedBy(value: Bytes | null) {
    if (!value) {
      this.unset("verifiedBy");
    } else {
      this.set("verifiedBy", Value.fromBytes(<Bytes>value));
    }
  }

  get status(): i32 {
    let value = this.get("status");
    return value!.toI32();
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }
}

export class LandTransfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("landId", Value.fromBigInt(BigInt.zero()));
    this.set("from", Value.fromBytes(Bytes.empty()));
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("status", Value.fromI32(0));
    this.set("updatedAt", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LandTransfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LandTransfer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LandTransfer", id.toString(), this);
    }
  }

  static load(id: string): LandTransfer | null {
    return changetype<LandTransfer | null>(store.get("LandTransfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get landId(): BigInt {
    let value = this.get("landId");
    return value!.toBigInt();
  }

  set landId(value: BigInt) {
    this.set("landId", Value.fromBigInt(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value!.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get verifiedBy(): Bytes | null {
    let value = this.get("verifiedBy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set verifiedBy(value: Bytes | null) {
    if (!value) {
      this.unset("verifiedBy");
    } else {
      this.set("verifiedBy", Value.fromBytes(<Bytes>value));
    }
  }

  get status(): i32 {
    let value = this.get("status");
    return value!.toI32();
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("role", Value.fromString(""));
    this.set("updatedAt", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get role(): string {
    let value = this.get("role");
    return value!.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }
}
