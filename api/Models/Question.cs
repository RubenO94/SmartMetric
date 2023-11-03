using Microsoft.EntityFrameworkCore;

public class Question
{  
    public Guid QuestionId { get; set; }
    public Guid FormTemplateId { get; set; }
    public Guid ScaleTemplateId { get; set; }
    public Guid UniqueAnswerTemplateId { get; set; }
    public string? Title { get; set; }
    public string? DescriptionPt { get; set; }
    public string? DescriptionEs { get; set; }
    public string? DescriptionEn { get; set; }
    public string? DescriptionFr { get; set; }
    public string? DescriptionPl { get; set; }
    public QuestionType? QuestionType { get; set; }
    public bool? Mandatory { get; set; }

}