type Question = {
    title: string,
    description: string,
    type: string, 
    position: number, 
    required: boolean,
    singleChoiceOption: SingleChoiceOption[],
    ratingOption: RatingOption[]
}

type SingleChoiceOption = {
    title: string,
    description: string
}

type RatingOption = {
    numericValue: number | null,
    title: string | null,
    description: string
}

type FormTemplate  = {
    translations: Translations[]
    questions: Question[]
}

type Translations = {
    language: string,
    title: string,
    description: string,
}