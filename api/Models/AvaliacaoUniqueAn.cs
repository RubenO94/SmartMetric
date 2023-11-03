using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoUniqueAn
{
    public int UniqueAnswerId { get; set; }

    public int UniqueAnswerTemplateId { get; set; }

    public int Value { get; set; }

    public string DescriptionPt { get; set; } = null!;

    public string DescriptionPl { get; set; } = null!;

    public string DescriptionEs { get; set; } = null!;

    public string DescriptionEn { get; set; } = null!;

    public string DescriptionFr { get; set; } = null!;

    public virtual AvaliacaoUniqueAnsTemplate UniqueAnswerTemplate { get; set; } = null!;
}
