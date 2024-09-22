export type Nullish<DataObject = unknown> =
  | Nullable<DataObject>
  | Optional<DataObject>;
export type Nullable<DataObject = unknown> = DataObject | null;
export type Optional<DataObject = unknown> = DataObject | undefined;

export type ValueOf<DataObject extends readonly [...any]> = DataObject[number];
