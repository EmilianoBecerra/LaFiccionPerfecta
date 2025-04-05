export interface ResponseData {
  responseId: string;
  user: string;
  message: string;
  timestamp: string
}

export interface Topic {
  topicId: string;
  title: string;
  message: string;
  timestamp: string;
  response: ResponseData[];
}

export interface MovieDiscussion {
  idMovie: string;
  topics: Topic[];
}

export interface DB {
  discussions: MovieDiscussion[];
}
