import { Subject } from "./subject";

export class Warrant {
    objectType: string;
    objectId: string;
    relation: string;
    subject: Subject;

    constructor(objectType: string, objectId: string, relation: string, subject: Subject) {
        this.objectType = objectType;
        this.objectId = objectId;
        this.relation = relation;
        this.subject = subject;
    }
}
