export interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    isDeleted: boolean;
}

export interface FormData {
    title: string;
    category: string;
}