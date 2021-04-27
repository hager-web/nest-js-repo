import {Document} from 'mongoose';

export class Todo extends Document { 
    readonly title: string;
    readonly description : string;
}