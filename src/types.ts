
export interface  EventsDto {
    id:string
    title: string
    content: string
    eventDate: string
    rsvp: string
    organization:string
    from: string,
    to: string
}

export interface UserDto {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    profileImage:string,
    backgroundImage:[],
    organization:string,
    biodata:string,
    industry:string,
    discipline:string,
    field:string,
    country:string 
    address:string;
    dateOfBirth : Date | Date[] | undefined
    phone: string
    experiences : Experience [] 
    academics : Academics []

}

export interface Academics {
    id:          string;
    institution: string;
    course:      string;
    start:       Date;
    end:         string;
    city:        string;
    userId:      string;
}

export interface Experience {
    id:       string;
    title:    string;
    org:      string;
    roleDesc: string;
    start:    Date;
    end:      string;
    nature:   string;
    location: string;
    userID:   string;
}

export interface IObjectKeys {
    [key: string]: string | number;
}

export interface PostRecords {
    id: string,
    ownerID: string,
    postData:string

}
export interface PostRecords {
    id:        string;
    postData:  string;
    createdOn: Date;
    category:  string;
    userID:    string;
    user:      Author;
}

export interface Author {
    firstname: string;
    lastname:  string;
}

export interface EventsDto {
    id:           string;
    title:        string;
    content:      string;
    eventDate:    string;
    rsvp:         string;
    organization: string;
    from:         string;
    to:           string;
}

export interface Message {
    id: string;
    senderId: string;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientKnownAs: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
}
export interface MessageResolver {
  Id:string,
  data : Array<Message>
}

export interface MessagePair {
  senderId: string;
  recipientId: string;
  messages: Message[];
}


export interface Notification {
    id:        string;
    userId:    string;
    message:   string;
    createdAt: Date;
    status:    string;
}

export interface HomeTotals {
    totalVentures:    number;
    totalExperts:     number;
    totalGrants:      number;
    totalconnections: number;
}

export interface GroupsProps {
    groupId: string;
    userId:  string;
    group:   Group[];
}

export interface Group {
    name:        string;
    description: string;
}
