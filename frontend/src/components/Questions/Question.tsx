export default class Question {
    id: string ='';
    title: string = '';
    tags: string[] = [];
    categories: string[] = [];
    constraints: string[] = [];
    difficulty: string = '';
    description: string = '';
    examples: Example[] = [];

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.title) this.title = initializer.title;
        if (initializer.tags) this.tags = initializer.tags;
        if (initializer.categories) this.categories = initializer.categories;
        if (initializer.constraints) this.constraints = initializer.constraints;
        if (initializer.difficulty) this.difficulty = initializer.difficulty;
        if (initializer.description) this.description = initializer.description;
        if (initializer.examples) this.examples = initializer.examples;
    }
}

interface Example {
    text: string;
    image: string;
}