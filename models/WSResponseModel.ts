export interface WSResponseModel {
    type: "error" | "success" | "new_message";
    message: MessageDetailsModel | UserDetailsModel | string;
}