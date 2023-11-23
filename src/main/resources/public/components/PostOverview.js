import { getPostComments } from "./post-overview/PostComments";
import { getPostDetails } from "./post-overview/PostDetails";

export function getPostOverview() {
    getPostComments();
}
