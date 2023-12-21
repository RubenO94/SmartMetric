export function handleValidationsForm(formTemplate: FormTemplate, currentStep: number): [boolean, any] {
    let formValid = true
    if (currentStep == 0 && (formTemplate.translations[0].title == '' || formTemplate.translations[0].title == null)) return [false, "title"]
    if (currentStep == 1 && formTemplate.questions.length == 0) return [false, "question"]
    formTemplate.questions.forEach((e) => {
        if(e.translations[0].title == '' || e.translations[0].title == null) formValid = false
    })

    if (!formValid) return [false, "questionTitle"]
    return [true, "Passing"]
}

export function handlevalidationsReview(review: Reviews, currentStep: number): [boolean, any] {
    return [true, "Passing"]
}