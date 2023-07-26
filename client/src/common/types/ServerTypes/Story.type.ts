import {Media} from './Media'

export type StoryType = {
    _id: string;
    title: string;
    media: Media[];
    content: string;
    members: string[];
    presentedDate?: Date | string;
 };
 