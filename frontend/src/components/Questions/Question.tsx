export default class Question {
    title: string = '';
    tags: string[] = [];
    categories: string[] = [];
    constraints: string[] = [];
    difficulty: string = '';
    description: string = '';

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.title) this.title = initializer.title;
        if (initializer.tags) this.tags = initializer.tags;
        if (initializer.categories) this.categories = initializer.categories;
        if (initializer.constraints) this.constraints = initializer.constraints;
        if (initializer.difficulty) this.difficulty = initializer.difficulty;
        if (initializer.description) this.description = initializer.description;

    }
}