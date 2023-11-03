using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoScaleTemplate
{
    public int ScaleTemplateId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public DateTime? LastModificationDate { get; set; }

    public int CreatedBy { get; set; }

    public virtual ICollection<AvaliacaoQuestion> AvaliacaoQuestions { get; set; } = new List<AvaliacaoQuestion>();

    public virtual ICollection<AvaliacaoScale> AvaliacaoScales { get; set; } = new List<AvaliacaoScale>();
}
