export type TaskTypes = {
  _id: string;
  task: string;
  isCompleted: boolean;
  created_at: string;
};

export type ResponseMessageTypes = {
  message?: string;
  data?: TaskTypes | TaskTypes[] | null;
};
