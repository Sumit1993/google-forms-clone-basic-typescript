export interface Question {
    type: 'text' | 'choice' | 'checkbox';
    label: string;
    options?: string[];
}

export interface Form {
    id: string,
    published: boolean,
    title: string,
    questions: Array<Question>
}
