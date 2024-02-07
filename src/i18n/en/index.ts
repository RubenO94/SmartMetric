import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	Sidebar: {
		Reviews: 'Reviews',
		Forms: 'Forms',
		Statistics: 'Statistics'
	},
	ReviewButton: "Create review",
	NewReviewTitle: "Create new review",
	PerformanceModule: "Performance module",
	Hello: "Hello",
	FormButton: "Create form",
	FormSearchInput: "Insert the title of the form template to filter the list",
	CreateFormModel: "Create form model",
	CreateFormModelDescription: "This feature allows the creation of form templates, establishing predefined structures for future reviews. Simplify the assessment process by creating consistent patterns, saving time, and maintaining uniformity in evaluations.",
	YourWork: "Your Work",
	CreateBlankReview: "Create blank review",
	CopyFormModel: "Copy form model",
	CreateBlankReviewDescription: "Create an empty review, that allows adding questions, associate the review type, specify the responsable and start and end date.",
	CopyFormModelDescription: "Create a review with a form template that includes predefined questions.",
	ShowSidebar: "Show sidebar",
	HideSidebar: "Hide sidebar",
	Settings: "Settings",
	Preview: "Preview",
	Details: "Details",
	Questions: "Questions",
	Finalize: "Finalize",
	ChooseLanguage: "Choose a language",
	Portuguese: "Portuguese",
	English: "English",
	French: "French",
	Spanish: "Spanish",
	Polish: "Polish",
	QuestionType: {
		Text: "Text",
		SingleChoice: "SingleChoice",
		Rating: "Rating",
	},
	Title: "Title",
	Description: "Description",
	ReviewSearchInput: "Insert the title of the review to filter the list",
	Ongoing: "Ongoing",
	Completed: "Completed",
	NotStarted: "Not started",
	Canceled: "Canceled",
	State: "State",
	EndingDate: "Ending date",
	Progression: "Progression",
	FormModelTitleTitle: "Form model title",
	FormModelTitleDescription: "Insert a title for the form model.",
	FormModelDescriptionTitle: "Form model description",
	FormModelDescriptionDescription: "Add a brief description that highlights the purpose or content of the model. This will help provide additional guidance on the form when selecting it for review.",
	Return: "Return",
	Forward: "Forward",
	QuestionTypeText: "Type of Question",
	FormPreview: "Form Preview",
	QuestionProperties: "Question Properties",
	FormPreviewPlaceholder: "No questions yet, drag one type of question to add a question to this form.",
	FormPreviewRatingPlaceholder: "No rating option answers yet.",
	FormPreviewSingleChoicePlaceholder: "No single choice option answers yet.",
	Answer: "Answer",
	Required: "Required",
	Answers: "Answers",
	Numeric: "Value",
	AddOption: "Add an option",
	AddSingleChoiceOptionError: "Single Choice option must have a text",
	AddRatingOptionError01: "All fields must be filled",
	AddRatingOptionError02: "A rating option for this number already exists",
	FormTemplateSuccess: "Form Template created successfully",
	QuestionWithoutDesc: "Question without description",
	ErrorsFormTemplate: {
		Title: "Form template must have a title",
		Question: "Form template must have at least one question",
		QuestionTitle: "All questions of form must have a title",
		Others: "Server error",
		SomethingWrong: "Something went wrong"
	},
	Departments: "Departments",
	ReviewTitleTitle: "Review Title",
	ReviewTitleDescription: "Insert a title to identify the review. Exemplo: 'Revisão Trimestral de Desempenho'",
	ReviewDescriptionTitle: "Review Description",
	ReviewDescriptionDescription: "Provide a detailed explanation of the scope, criteria, and objectives of this review. This helps ensure a comprehensive understanding of the elements to be evaluated.",
	ReviewTypeTitle: "Review type",
	ReviewTypeDescription: "Choose the evaluation method that best suits the organizational dynamics.",
	SaveReviewAsForm: "Save Review as Form template",
	SaveReviewAsFormDesc: "If you wish, you can save the questionnaire from this review as a form template to facilitate the quick creation of future reviews. Just check the option below.",
	SaveForm: "Save Form",
	StartAndEndDateText: "Specify End Date.",
	StartAndEndDateDesc: "Optionally, you can specify start and end dates for the review. If you don't provide this information now, you will be prompted to indicate the dates when you actually start the review.",
	TopDown: {
		Label: "Top-Down",
		Text: "Evaluation conducted from the top down, typically by supervisors."
	},
	BottomUp: {
		Label: "Bottom-Up",
		Text: "Evaluation conducted from the bottom up, where employees also assess their superiors."
	},
	SelfEvaluation: {
		Label: "Self-Evaluation",
		Text: "Individual self-evaluation of performance."
	},
	Interdepartmental: {
		Label: "Interdepartmental",
		Text: "Evaluation among superiors from different departments."
	},
	StartDate: "Start Date",
	EndDate: "End Date",
	SelectDepartmentsLabel: "Select Departments to be Evaluated",
	SelectDepartmentsText: "Select the department(s) that will be evaluated during this review. This helps to focus the assessment on specific areas of the organization.",
	ErrorsReview: {
		Title: "Review must have a title",
		Question: "Review must have at least one question",
		QuestionTitle: "All questions of review must have a title",
		ReviewType: "Review must have a type",
		Departments: "Review must have at least one department associated",
		Others: "Server error",
		SomethingWrong: "Something went wrong"
	},
	Backoffice: "Backoffice module",
	Frontoffice: "Frontoffice module",
	Form: "Form",
	EditFormButton: "Edit form",
	EditFormModel: "Edit form model",
	EditFormModelDescription: "This feature empowers users to effortlessly edit form templates, providing a seamless avenue for refining predefined structures in preparation for future assessments. Enhance the efficiency of the evaluation process by easily modifying and updating established patterns, ensuring time savings and preserving uniformity in evaluations. Whether adjusting criteria, updating fields, or refining content, the editing functionality streamlines the customization of form templates to meet evolving needs.",
	StateDontExist: "Review must be started",
	ButtonExitModule: "Return to SmartTime",
	Delete: "Delete",
	Cancel: "Cancel",
	DeleteDialogForm: "Delete form template?",
	DeleteDialogFormDesc: "Are you sure you want to delete the form? This action cannot be undone.",
	ChangeReviewStatus: "Change review status",
	ChangeReviewStatusDesc: "Are you sure you want to change status of the review? This action cannot be undone.",
	ChangeStatus: "Change Status",
	ReviewState: {
		NotStarted: "Not Started",
		Active: "Active",
		Canceled: "Canceled",
		Completed: "Completed",
		DontExist: "No status"
	},
	Help: "Help",
	StartReview: "Start review",
	ChangeReviewStatusDialog: "Start Review?",
	ChangeReviewStatusDialogDesc: "Are you sure you want to start review? This action cannot be undone.",
	Start: "Start",
	AddEndDate: "Enter a valid date for day limit of review",
	User: "User",
	ShowFormIn: "Show form in",
	ErrorAddingLanguagesToForm: "Select at least one language for form",
	AddLanguage: "Add language",
	Edit: "Edit",
	CancelReview: "Cancel review",
	GoBack: "Voltar",
	ChangeReviewStatusDialog2: "Cancel review?",
	ChangeReviewStatusDialogDesc2: "Are you sure you want to cancel review? This action cannot be undone.",
	SaveReviewAsFormDialog: "Save review as form?",
	SaveReviewAsFormDescDialog: "Are you sure you want to save review as form.",
	ShowMenu: "Show menu",
	SaveAsForm: "Save as form",
	RemoveReviewStatusDialog: "Delete review?",
	RemoveReviewStatusDialogDesc: "Are you sure you want to remove review? This action cannot be undone.",
	DeleteFormMessage: "Form template deleted successfully.",
	DeleteReviewMessage: "Review deleted successfully.",
	FormDivText: "There are no forms of this language to show at the moment.",
	EditReview: "Edit review",
	EditReviewDescription: "This feature allows you to edit review before active it.",
	NoDescription: "This question doesn't have a description",
	NoTitle: "This question doesn't have a title",
	SelectAll: "Select all",
	SelectLangs: "Select languages to create a form",
	EditFormMessage: "Form template edited successfully",
	EditReviewMessage: "Review edited successfully",
	PatchReviewStatusError: "End date can't be before Start date of review",
	PatchReviewStatus: "Review status updated successfully",
	CreationDate: "Creation date",
	AvailableLangs: "Available languages",
	SelectLangsReview: "Select languages to create a review",
	Employees: "Employees",
	AdminSettings: "Admin settings",
	ChooseProfile: "Choose profile",
	ChooseProfileDesc: "Select a profile to change their permissions",
	SaveChanges: "Save changes",
	Review: "Review",
	BasicInfo: "Basic information",
	ReviewSuccess: "Review created successfully",
	Continue: "Continue",
	SelectFormTemplate: "Select form template to use:",
	NoEmployees: "No Employees",
	ReviewDivText: "There are no reviews available to show yet.",
	Submissions: {
		Name: "Submissions",
		NameSingle: "Submission",
		SubmissionsCompleted: "Submissions completed",
		SubmissionsMissing: "Submissions missing"
	},
	NoSubmissions: "No submissions to do",
	SubmissionsToDo: "Submissions to do",
	SubmissionTable: {
		Evaluator: "Evaluator",
		Evaluated: "Evaluated",
		SubmissionDate: "Submission date",
		Completed: "Completed"
	},
	Search: "Search",
	Submit: "Submit",
	NoSubmissionsYet: "No submissions yet.",
	Evaluating: "Evaluating",
	SubmissionsDescriptionText: "Under, you should see reviews which are active, and clicking them must open the submissions you must do",
	Evaluate: "Evaluate",
	ProgressReview: "Progress of review",
	ActiveReviews: "Active reviews",
	CompletedReviews: "Completed reviews",
	Permissions: "Permissions",
	Dashboard: "Dashboard",
	Tasklist: "Tasklist",
	NoSubmissionsListLabel: "You don't have pending submissions",
	LoadMore: "Load more",
	EditDialogSubmission: "Submit submission?",
	EditDialogSubmissionDescription: "Are you sure you want to submit submission? This action can't be undone.",
	ReviewProgressChartLabel: "No active reviews to show the progress.",
	Average: "Average",
	Total: "Total",
	NoReviewsComp: "No reviews completed",
	SelectReview: "Select review",
	SelectReviewText: "Choose between all completed reviews, the one you want to show data.",
	ReviewStatusChartLabel: "No reviews to show.",
	SeeMore: "See more"
}

export default en