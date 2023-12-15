export function handleValidationsForm(formTemplate: FormTemplate, currentStep: number): [boolean, any] {
    let formValid = true
    if (currentStep == 0 && (formTemplate.translations[0].title == '' || formTemplate.translations[0].title == null)) return [false, "Form Template must have a title"]
    if (currentStep == 1 && formTemplate.questions.length == 0) return [false, "Form Template must have at least one question"]
    formTemplate.questions.forEach((e) => {
        if(e.translations[0].title == '' || e.translations[0].title == null) formValid = false
    })

    if (!formValid) return [false, "All questions must have a title"]
    return [true, "Passing"]
}

export function handlevalidationsReview(review: Reviews, currentStep: number): [boolean, any] {
    return [true, "Passing"]
}