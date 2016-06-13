namespace ReactStarter.Common.Api
{
    public class PackageMessage
    {
        public MessageType Type { get; set; } = MessageType.Info;

        public string Message { get; set; } = "";

        public PackageMessage() : base() { }

        public PackageMessage(MessageType type, string message = "")
        {
            this.Type = type;
            this.Message = message;
        }
    }
}
