using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MyGraphToolkit.Api.Models
{
    public class Subscription
    {
        [DataMember(Name="value")]
        public IEnumerable<Value> Value { get; set; }
    }

    public class Value
    {
        [DataMember(Name = "subscriptionId")]
        public string SubscriptionId { get; set; }
        [DataMember(Name = "clientState")]
        public object ClientState { get; set; }
        [DataMember(Name = "changeType")]
        public string ChangeType { get; set; }
        [DataMember(Name = "resource")]
        public string Resource { get; set; }
        [DataMember(Name = "subscriptionExpirationDateTime")]
        public DateTime SubscriptionExpirationDateTime { get; set; }
        [DataMember(Name = "resourceData")]
        public ResourceData ResourceData { get; set; }
        [DataMember(Name = "tenantId")]
        public string TenantId { get; set; }
        public string GetUserId()
        {
            string id = ResourceData.OdataId;
            string[] splitData = id.Split("/");
            if (splitData.Length > 1)
            {
                string userIdData = splitData[1];
                return userIdData.Replace("presences('", "").Replace("')", "");
            }
            return "";
        }
    }

    public class ResourceData
    {
        [DataMember(Name = "@odata.type")]
        public string OdataType { get; set; }
        [DataMember(Name = "@odata.id")]
        public string OdataId { get; set; }
        [DataMember(Name = "id")]
        public string Id { get; set; }
        [DataMember(Name = "activity")]
        public string Activity { get; set; }
        [DataMember(Name = "availability")]
        public string Availability { get; set; }
    }

}
