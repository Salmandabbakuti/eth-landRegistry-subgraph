import {
  LandRegistered as LandRegisteredEvent,
  LandRegistrationVerified as LandRegistrationVerifiedEvent,
  LandTransferRegistered as LandTransferRegisteredEvent,
  LandTransferVerified as LandTransferVerifiedEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/LandRegistry/LandRegistry"
import {
  Land,
  LandTransfer,
  User
} from "../generated/schema"

export function handleLandRegistered(event: LandRegisteredEvent): void {
  let land = new Land(event.params.landId.toString())
  land.landId = event.params.landId
  land.plotCoords = event.params.plotCoords
  land.area = event.params.area
  land.owner = event.params.owner
  land.status = event.params.status
  land.updatedAt = event.block.timestamp
  land.save()
}

export function handleLandRegistrationVerified(
  event: LandRegistrationVerifiedEvent
): void {
  let land = Land.load(event.params.landId.toString())
  if (!land) {
    land = new Land(event.params.landId.toString())
  }
  land.status = event.params.status
  land.verifiedBy = event.params.verifiedBy
  land.updatedAt = event.block.timestamp
  land.save()
}

export function handleLandTransferRegistered(
  event: LandTransferRegisteredEvent
): void {
  let landTransfer = new LandTransfer(event.transaction.hash.toHex() + "-" + event.params.landId.toString())
  landTransfer.landId = event.params.landId
  landTransfer.from = event.params.from
  landTransfer.to = event.params.to
  landTransfer.status = event.params.status
  landTransfer.updatedAt = event.block.timestamp
  let land = Land.load(event.params.landId.toString())
  if (land) {
    land.status = event.params.status
    land.updatedAt = event.block.timestamp
    land.save()
  }
  landTransfer.save()
}

export function handleLandTransferVerified(
  event: LandTransferVerifiedEvent
): void {
  let landTransfer = new LandTransfer(event.transaction.hash.toHex() + "-" + event.params.landId.toString())
  landTransfer.landId = event.params.landId
  landTransfer.from = event.params.from
  landTransfer.to = event.params.to
  landTransfer.status = event.params.status
  landTransfer.verifiedBy = event.params.verifiedBy
  landTransfer.updatedAt = event.block.timestamp
  landTransfer.save()
  if (event.params.status === 2) {
    const land = Land.load(event.params.landId.toString())
    if (land) {
      land.owner = event.params.to
      land.status = event.params.status
      land.updatedAt = event.block.timestamp
    }
  }
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let user = User.load(event.params.addr.toHex())
  if (!user) {
    user = new User(event.params.addr.toHex())
  }
  user.address = event.params.addr
  user.role = event.params.role
  user.updatedAt = event.block.timestamp
  user.save()
}
