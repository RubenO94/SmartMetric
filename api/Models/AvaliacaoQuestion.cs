using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoQuestion
{
    public int QuestionId { get; set; }

    public int FormTemplateId { get; set; }

    public int? ScaleTemplateId { get; set; }

    public int? UniqueAnswerTemplateId { get; set; }

    public string DescriptionPt { get; set; } = null!;

    public string DescriptionPl { get; set; } = null!;

    public string DescriptionEs { get; set; } = null!;

    public string DescriptionEn { get; set; } = null!;

    public string DescriptionFr { get; set; } = null!;

    public bool Mandatory { get; set; }

    public int Type { get; set; }

    public virtual AvaliacaoFormTemplate FormTemplate { get; set; } = null!;

    public virtual AvaliacaoScaleTemplate? ScaleTemplate { get; set; }

    public virtual AvaliacaoUniqueAnsTemplate? UniqueAnswerTemplate { get; set; }
}
