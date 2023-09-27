using System.Drawing;
using CpuServer.Models.Validation;

namespace CpuServer.Models
{
    public class Cpu
    {
        public string Name { get; set; }
        public int CoreCount { get; set; }
        public Cpu(string name, int coreCount)
        {
            ValidateDomain(name, coreCount);
        }

        private void ValidateDomain(string name, int coreCount)
        {
            DomainValidation.When(string.IsNullOrEmpty(name), "Invalid name. Name is required");
            DomainValidation.When(coreCount < 0, "Core number must be a possitive");
            Name = name;
            CoreCount = coreCount;
        }
    }
}
