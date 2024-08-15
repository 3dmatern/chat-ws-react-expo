export interface MessageCreateModel {
    authorId: string;
    created_at: string;
    text: string;
}

export interface MessageDetailsModel extends MessageCreateModel {
    id: string;
    author: UserDetailsModel;
}