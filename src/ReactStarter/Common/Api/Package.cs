using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;

namespace ReactStarter.Common.Api
{
    public class Package
    {
        public PackageMessage[] Messages { get; set; }

        public Package()
        {
        }

        public Package(string message = "", MessageType issueType = MessageType.Success)
        {
            Messages = string.IsNullOrEmpty(message) ? new PackageMessage[0] : new[] { new PackageMessage { Type = issueType, Message = message } };
        }

        public Package(string[] messages, MessageType issueType = MessageType.Exception)
        {
            Messages = messages.Select(x => new PackageMessage { Message = x, Type = issueType }).ToArray();
        }

        public Package(PackageMessage[] messages)
        {
            Messages = messages;
        }

        public Package(Exception ex)
        {
            if (ex is DbEntityValidationException)
            {
                var messages = new List<PackageMessage>();
                var dbEntity = ex as DbEntityValidationException;
                foreach (var entity in dbEntity.EntityValidationErrors)
                {
                    foreach (var error in entity.ValidationErrors)
                    {
                        messages.Add(new PackageMessage(MessageType.Validation, error.ErrorMessage));
                    }
                }

                Messages = messages.ToArray();
            }
            else
            {
                var theException = ex;
                while (theException.InnerException != null)
                {
                    theException = theException.InnerException;
                }

                Messages = new[] { new PackageMessage { Type = MessageType.Exception, Message = theException.Message } };
            }
        }
    }

    public class Package<T> : Package
    {
        public T Data { get; set; }

        public Package()
        {
            Data = default(T);
        }

        public Package(T data, string message = "", MessageType issueType = MessageType.Success) : base(message, issueType)
        {
            Data = data;
        }

        public Package(Exception ex) : base(ex)
        {
        }
    }

    public class Package<TData, TMeta> : Package<TData> where TData : class
    {
        public TMeta Meta { get; set; }

        public Package()
        {
            Meta = default(TMeta);
        }

        public Package(TData data, TMeta meta) : base(data)
        {
            Meta = meta;
        }

        public Package(Exception ex) : base(ex)
        {
        }
    }
}
