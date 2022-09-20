import { Subject } from "./subject";

export interface Warrant {
    objectType: string;
    objectId: string;
    relation: string;
    subject: Subject;
}
