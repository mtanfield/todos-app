export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    onToggleCompleted?: (completed: boolean) => void;
    onAction?: (action: 'edit' | 'delete') => void;
}