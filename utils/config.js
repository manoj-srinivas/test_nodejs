let config = {
  basePath: `/${process.env.NODE_ENV}/`,
  logUserExpireTime: 2,
  logUserExpireType: "days",
  saltSize: 16,
  keySize: 24,
  jwtSecret: "CheckD0cs",
  defaultLimit: 25,
  jwtOptions: {
    // expiresIn: process.env.TOKENEXPIRY,
    expiresIn: '365d',
  },
  AWS: {
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
    IAM_USER_KEY: process.env.IAM_USER_KEY,
    IAM_USER_SECRET: process.env.IAM_USER_SECRET,
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    IDENTITY_TYPE: "IAM",
    RESET_DISABLED: true,
    SESSION_LIFETIME_MINUTES: 15,
    UNDO_REDO_DISABLED: false,
  },
  UPLOAD_PATH: {
    PROFILE_IMAGE_PATH: `${__dirname}/../uploads/profile-pictures/`,
    ENCODE_SCSV: `${__dirname}/../uploads/encoded-csv/`,
    THUMBNAIL: `${__dirname}/../uploads/thumbnail/`,
    CREATE_IMAGE: `${__dirname}/../uploads/create-image/`,
    KEYS: `${__dirname}/../keys`,
    1: `${__dirname}/../uploads/document/`,
    2: `${__dirname}/../uploads/video/`,
    3: `${__dirname}/../uploads/audio/`,
    6: `${__dirname}/../uploads/image/`,
    TEMP: `${__dirname}/../uploads/temp/`,
    LOGS: `${__dirname}/../cdrlogs/`,
    image: `${__dirname}/../uploads/profile/image/`,
    game: `${__dirname}/../uploads/game/`,
    uploads: `${__dirname}/../uploads/`,
    images: `${__dirname}/../uploads/images/`,
    instance: `${__dirname}/../db/newInstance/`,
  },
  validationType: {
    String: "String",
    Number: "Number",
    Integer: "Integer",
    Array: "Array",
    ArrayOfInteger: "ArrayOfInteger",
    ArrayOfObject: "ArrayOfObject",
    Float: "Float",
    Boolean: "Boolean",
    JSON: "JSON",
    Date: "Date",
    Time: "Time",
    DateTime: "DateTime",
    LocalTime: "LocalTime",
    LocalDateTime: "LocalDateTime",
    Duration: "Duration",
    Function: "Function",
    Object: "Object",
    V012: "V012",
    Email: "Email",
    Password: "Password",
    RegEx: "RegEx",
  },
  languageCode: ["ta", "en"],
  // assignmentType: [
  //   'Completion', 'Submission', 'Evaluation'
  // ],
  notificationStatus: {
    notSeen: 1,
    seen: 2,
    clicked: 3,
  },
  loginType: {
    gmail: 1,
    fb: 2,
    apple: 3
  },
  loginMethod: {
    email: 1,
    mobile: 2
  },
  permissionType: {
    supportStaff: 1
  },
  searchReportType: {
    all: "ALL",
    forMe: "FORME",
    byME: "BYME",
    forPlaylist: "FORPLAYLIST",
    learningContent: "LEARNING_CONTENT",
    mooc: "MOOC",
    events: "EVENTS",
    homePage: "HOMEPAGE"
  },
  Boolean: {
    true: 1,
    false: 0,
  },
  routerOptions: {
    caseSensitive: true,
    strict: true,
  },
  cookie: {
    // secure: true,
    path: "/",
    // httpOnly: true,
    hostOnly: true,
    sameSite: false,
    // domain: "localhost",
    // signed: false,
    encode: String,
    // expires: new Date(Date.now() + 60000),
    maxAge: 60000 * 20,
  },
  Mail: {
    Transport: {
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false, // use SSL
      auth: {
        user: `${process.env.NODEMAILER_USER}`,
        pass: `${process.env.NODEMAILER_PASS}`,
      },
    },
    From: `<${process.env.NODEMAILER_FROM}>`,
    CC: `${process.env.NODEMAILER_CC}`,
  },
  sequelizeOptions: {
    dialect: "mysql",
    max: 256,
    min: 1,
    acquire: 120000,
    idle: 20000,
    evict: 10000,
    charset: "utf8",
    collate: "utf8_general_ci",
    underscored: false,
    timestamps: false,
    freezeTableName: true,
    logging: console.log,
    // useUTC: true, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "+00:00", //for writing to database
  },
  conditions: {
    $gt: " > ",
    $gte: " >= ",
    $lt: " < ",
    $lte: " <= ",
    $eq: " = ",
    $between: " BETWEEN ",
  },
  cardType: {
    visa: "001",
    mastercard: "002",
    amex: "003",
    discover: "004",
    diners: "005",
    jcb: "007",
  },
  eventMasterReplacementData: [
    ["UserID"],
    ["UserID"],
    ["ControllerID"],
    ["ControllerID"],
    ["ControllerID"],
    ["UserID"],
    ["UserID"],
    ["UserID"],
    ["S3Path"],
    ["S3Path"],
    ["S3Path"],
    ["LocationName"],
    ["LocationName"],
    ["LocationName"],
    ["ReportTypeName"],
    ["ReportName"],
    ["ReportName"],
    ["ReportName"],
    ["ReportName"],
    ["AccountName"],
    ["AccountName"],
    ["AccountName"],
    ["AccountName"],
    ["AccountName"],
    ["AccountName"],
    ["AccountName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["CustomerName"],
    ["ReportName"],
    ["ReportName"],
    ["ReportName"],
    ["ReportName"],
  ],
  forms: {
    Terms: 1,
    Node: 2,
    Assignment: 3,
    KnowledgeCard: 4,
  },
  /*nodeStatus: {
    Draft: "DRAFT",
    Published: "PUBLISHED",
    Moderation: "MODERATION",
    Rejected: "REJECTED",
    Deleted: "DELETED"
  },
  nodeType: {
    KnowledgeCard: 1,
    Assignment: 2
  },*/
  userAccountStatus: {
    // pending: 0,
    active: 1,
    deactivated: 2,
    freezed: 3
  },
  registrationRequestStatus: {
    pending: 0,
    approved: 1,
    declined: 2,
  },
  AcceptedNotificationDays: 10,
  assignmentType: {
    completion: 1,
    submission: 2,
  },
  assignmentStatus: {
    assigned: 1,
    submitted: 2,
    reassigned: 3,
    closed: 4,
    aborted: 5,
  },
  resourceStatus: {
    draft: 1,
    published: 2,
    moderation: 3,
    rejected: 4,
  },
  authLogAction: {
    requestOTP: 1,
    OTPfail: 2,
    nonExistentLoginID: 3,
    deletedLoginID: 4,
    inactiveLoginID: 5,
  },
  responseMessage: {
    noContent: "No content",
  },
  taskGroup: {
    assignment: 1,
    knowledgeCard: 2,
    workGroup: 3,
    course: 4,
    moderation: 5,
    answerExperts: 6,
    events: 7,
    mooc: 8,
  },
  type: {
    invite: 1,
    request: 2,
  },
  requestStatus: {
    pending: 1,
    accepted: 2,
    ignored: 3,
    revoked: 4,
  },
  getAssignmentReportStatus: {
    active: "active",
    closed: "closed",
  },
  updateRequestStatus: {
    accepted: 2,
    ignored: 3,
  },
  variableLength: {
    integer: 11,
    bigint: 20,
    tinyint: 4,
    smallint: 6,
    varChar10: 10,
    varChar20: 20,
    varChar50: 50,
    varChar100: 100,
    varChar150: 150,
    varChar250: 250,
    varChar500: 500,
    varChar5000: 5000,
    text: 65535,
  },
  termStatus: {
    active: 1,
    inActive: 2,
    moderate: 3,
  },
  // userType: {
  //   internal: 1,
  //   external: 2
  // },
  termsType: {
    system: 0,
    user: 1,
    admin: 2,
  },
  gender: {
    male: 1,
    female: 2,
  },
  resourceFormat: {
    document: 1,
    video: 2,
    audio: 3,
    page: 4,
    link: 5,
    image: 6,
    live: 7
  },
  bulkImport: {
    dataSize: 100,
  },
  termSet: {
    skills: 1,
    skillLevels: 2,
    competency: 3,
    roleCompetency: 4,
    designation: 5,
    company: 6,
    department: 7,
    country: 8,
    city: 9,
    location: 10,
    gender: 11,
    rolePermission: 12,
    keywords: 13,
    ageGroup: 15,
    tenures: 16,
    issuingAuthority: 18,
    permissionGroup: 19,
    category: 20,
    promotion: 21,
    reportAndIssue: 22
  },
  skillLevelID: {
    basic: 1,
    novice: 2,
    intermediate: 3,
    advanced: 4,
    Expert: 5,
  },
  messageStatus: {
    published: 2,
    moderation: 1,
    rejected: 3,
  },
  resourceType: {
    // knowledgeCard: 1,
    // knowledgeBead: 2,
    // news: 3,
    // playlist: 4,
    // answer: 5,
    // course: 6,
    // learningContent: 10,
    // MOOC: 11,
    // internalEvent: 12,
    // externalEvent: 13,
    editorialVideos: 1,
    editorialArticles: 2,
    matchLive: 3,
    userLive: 4,
    userTextPost: 5,
    editorialPhotos: 6,
    stories: 7,
    exclusiveVideos: 8,
    internalSharing: 9,
    polls: 10,
    general: 11
  },
  newsFeedResourceType: [1, 2, 3, 4, 5, 6, 8, 9, 10],
  storiesResourceType: [7],
  elasticIndice: {
    resource: "resource",
    newsFeed: "newsfeed",
    stories: "stories",
    user: "user",
    hashtags: "hashtag",
    userActivity: "user-activity",
    userLog: "user-log",
    dailySkillLog: "daily-skill-log",
    dailyCourseLog: "daily-course-log",
    dailyResourceLog: "daily-resource-log",
    dailyActivityLog: "daily-activity-log",
    skillGapLog: "skill-gap-log",
    userSkillGapLog: "user-skill-gap-log",
  },
  resourceIndexType: {
    newsFeed: 1,
    stories: 2
  },
  storiesInterval: 24,
  default: {
    pageNumber: 1,
    resourceCount: 5,
    peopleCount: 5,
  },
  fieldType: {
    reference: "reference",
  },
  regexPattern: {
    duration: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5]\d)/,
  },
  maximumValue: {
    integer: 4294967295,
    bigint: 18446744073709551615,
    tinyint: 255,
    smallint: 65535,
    percentage: 100,
    three: 3,
    two: 2,
    one: 1
  },
  minimumValue: {
    zero: 0,
    one: 1,
  },
  orderBy: {
    asc: "asc",
    desc: "desc"
  },
  resourceStats: {
    readCount: 0,
    conversationCount: 0,
    ratingCount: 0,
    avgRating: 0,
    forwardingCount: 0,
    assignmentCount: 0,
    likesCount: 0,
  },
  rating: [1, 2, 3, 4, 5],
  resourceSettings: {
    commenting: {
      inactive: "inactive",
      show: "show",
      hide: "hide",
    },
  },
  trimLength: {
    resTitle: 80,
  },
  errorCode: {
    unauthorized: {
      invalidToken: "INVALID_TOKEN",
      tokenExpired: "TOKEN_EXPIRED",
      tokenExpected: "TOKEN_EXPECTED",
      sessionExpired: "SESSION_EXPIRED",
    },
    forbidden: {
      duplicate: "DUPLICATE",
      competencyHasSkill: "COMPETENCY_HAS_SKILL",
      lastSkillCompetency: "LAST_SKILL_COMPETENCY",
      lastRecord: "LAST_RECORD",
      alreadyMember: "ALREADY_MEMBER",
      recursiveMember: "RECURSIVE_MEMBER",
      permissionDenied: "PERMISSION_DENIED",
      assessmentInterrupted: "ASSESSMENT_INTERRUPTED",
      assessmentCompleted: "ASSESSMENT_COMPLETED",
      insufficientQuestions: "INSUFFICIENT_QUESTIONS",
      emptyUserIDOrWorkgroupID: "EMPTY_USERID_OR_WORKGROUPID",
      beforeIDDataNotFound: "BEFOREID_DATA_NOT_FOUND",
      eitherOneParamsRequired: "EITHER_ONE_PARAMETER_REQUIRED",
      noDataExists: "NO_DATA_EXISTS",
      notAbleToProcess: "NOT_ABLE_TO_PROCESS",
      notGroupOwner: "NOT_GROUP_OWNER",
      notInWorkgroup: "NOT_IN_WORKGROUP",
      notPublished: "NOT_PUBLISHED"
    },
    unProcessableEntity: {
      recordNotFound: "RECORD_NOT_FOUND",
      recordNotUpdated: "RECORD_NOT_UPDATED",
      recursiveEntry: "RECURSIVE_ENTRY",
      propertyError: "PROPERTY_ERROR",
      needParameter: "NEED_ATLEAST_ONE_PARAMETER",
      userAccountDeactivated: "USER_ACCOUNT_DEACTIVATED",
      invalidOTP: "INVALID_OTP",
      courseModuleNotFound: "COURSE_MODULE_NOT_FOUND",
      reportingUserNotExist: "REPORTING_USER_NOT_EXIST",
      invalidParameter: "INVALID_PARAMETER",
      oneLevelReply: "ONE_LEVEL_REPLY"
    },
  },
  endorsementRelationship: {
    manager: 1,
    managerIndirect: 2,
    WGPeer: 3,
    peer: 4,
  },
  endorsementListUserType: {
    manager: "manager",
    peer: "peer",
  },
  activityType: ["LC", "AS", "AT"],
  enrolmentRequestStatus: {
    pending: 0,
    approved: 1,
    declined: 2,
  },
  resourceTypeName: {
    knowledgeCard: "knowledgeCard",
    knowledgeBead: "knowledgeBead",
    news: "news",
    playlist: "playlist",
    answer: "answer",
    course: "course",
    learningContent: "learningContent",
  },
  editorialResource: [3, 9, 7, 8],
  searchResourceType: {
    all: "all",
    editorial: "editorial",
    playlist: "playlist",
    course: "course",
    answer: "answer",
    knowledgeBead: "knowledgeBead",
    userPost: "userPost",
  },
  permission: {
    P01: "P01",
    P02: "P02",
  },
  parentPublisherType: {
    knowledgeBead: 1,
    playlist: 2,
    certificate: 3,
  },
  functionID: {
    PostAndModerateKnowledgeBead: "KB002",
    PostKnowledgeCard: "KC001",
    PostAndModerateQuestion: "QS002",
    PostAndModeratePlaylist: "PL002",
    PostKnowledgeBead: "KB001",
    PostQuestion: "QS001",
    PostPlaylist: "PL001",
    ModerateAllResource: "RES001",
    ManageCourse: "RES002",
    PostEditorialResource: "ED001",
    PostAndModerateEditorialResource: "ED002",
    ManageTerm: "RES003",
    ManageCertificate: "RES004",
    ManageConversation: "RES005",
    ManageSkills: "RES006",
    ManageUser: "MU001",
    ManageWorkgroup: "MWG001",
    ManageAnalytics: "VA001",
    ManageFeedback: "MFB001",
    ManageRegistration: "REG001",
    ManageChannel: "MC001",
    ManagePermission: "MP001",
    //<--New functionIDs-->//
    PostContent: "CON001",
    PostAndModerateEditorialContent: "CON002",
    ManageContent: "CON003",
    ViewContent: "CON004",

    PostMOOC: "MOOC001",
    PostAndModerateEditorialMOOC: "MOOC002",
    ManageMOOC: "MOOC003",
    ViewMOOC: "MOOC004",

    PostIE: "IEV001",
    PostAndModerateEditorialIE: "IEV002",
    ManageIE: "IEV003",
    ViewIE: "IEV004",

    PostEE: "EEV001",
    PostAndModerateEditorialEE: "EEV002",
    ManageEE: "EEV003",
    ViewEE: "EEV004",

    ViewCourse: "COU004",
    manageKB: "KB003",
    managePlaylist: "PL003",
    manageQuestion: "QS003"

  },
  resourceTypeFunctionIDs: {
    1: {
      post: "KC001",
      view: "KC004"
    },
    content: {
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
    2: { //<--Knowledgebead-->//
      post: "KB001",
      postAndModerate: "KB002",
      manage: "KB003",
      view: "KB004"
    },
    3: { //<--News-->//
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
    4: { //<--Playlist-->//
      post: "PL001",
      postAndModerate: "PL002",
      manage: "PL003",
      view: "PL004"
    },
    5: { //<--Answer-->//
      post: "QS001",
      postAndModerate: "QS002",
      manage: "QS003",
      view: "QS004"
    },
    6: { //<--Course-->//
      manage: "RES002",
      view: "COU004"
    },
    7: { //<--Policy-->//
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
    8: { //<--Learning-->//
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
    9: { //<--SOP-->//
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
    11: { //<--MOOC-->//
      post: "MOOC001",
      postAndModerate: "MOOC002",
      manage: "MOOC003",
      view: "MOOC004"
    },
    12: { //<--Internal Events-->//
      post: "IEV001",
      postAndModerate: "IEV002",
      manage: "IEV003",
      view: "IEV004"
    },
    13: { //<--External Events-->//
      post: "EEV001",
      postAndModerate: "EEV002",
      ManageEE: "EEV003",
      view: "EEV004"
    },
    14: { //<--Blog-->//
      post: "CON001",
      postAndModerate: "CON002",
      manage: "CON003",
      view: "CON004"
    },
  },
  pointEventType: {
    learning: 1,
    engagement: 2,
  },
  pointsEventID: {
    rate: "Rate",
    unRate: "Unrate",
    receiveRating: "ReceiveRating",
    unReceiveRating: "UnreceiveRating",
    comment: "Comment",
    deleteComment: "DeleteComment",
    receiveComment: "ReceiveComment",
    unReceiveComment: "UnreceiveComment",
    likeComment: "LikeComment",
    beLikedComment: "BeLikedComment",
    unLikeComment: "UnlikeComment",
    beUnlikedComment: "BeUnlikedComment",
    assigner: "Assigner",
    completeAssigner: "CompleteAssigner",
    completeAssignee: "CompleteAssignee",
    abortAssignment: "AbortAssignment",
    createPlaylist: "CreatePlaylist",
    removePlaylist: "RemovePlaylist",
    publishPlaylist: "PublishPlaylist",
    forward: "Forward",
    publishKBLink: "PublishKBLink",
    unPublishKBLink: "UnpublishKBLink",
    publishKB: "PublishKB",
    unPublishKB: "UnpublishKB",
    assignKC: "AssignKC",
    publishKCAssignee: "PublishKCAssignee",
    publishKCAssigner: "PublishKCAssigner",
    abortKC: "AbortKC",
    askQuestion: "AskQuestion",
    answerQuestion: "AnswerQuestion",
    receiveAnswer: "ReceiveAnswer",
    usefulAnswer: "UsefulAnswer",
    likeAnswer: "LikeAnswer",
    beLiked: "BeLiked",
    unLikeAnswer: "UnlikeAnswer",
    beUnliked: "BeUnliked",
    endroseVoluntarily: "EndroseVoluntarily",
    endorseRecomm: "EndorseRecomm",
    giveFeedback: "GiveFeedback",
    enroll: "Enroll",
    nominate: "Nominate",
    complete: "Complete",
    certification: "Certification",
    videoAudio: "Video-Audio",
    documentsPages: "Documents-pages",
    externalLink: "ExternalLink",
    getRead: "GetRead",
    acceptCertification: "AcceptCertification",
    removeCertification: "RemoveCertification",
    createWorkgroup: "CreateWorkgroup",
    deleteWorkgroup: "DeleteWorkgroup",
    joinWorkgroup: "JoinWorkgroup",
    exitWorkgroup: "ExitWorkgroup",
    addInterest: "AddInterest",
    removeInterest: "RemoveInterest",
    completeAssigneeDelayed: "CompleteAssigneeDelayed",
    registerIE: "RegisterInternalEvent",
    registerEE: "RegisterExternalEvent",
    registerMOOC: "RegisterMOOC",
    nominateIE: "NominateInternalEvent",
    nominateEE: "NominateExternalEvent",
    nominateMOOC: "NominateMOOC",
    didNotAttendIE: "DidNotAttendInternalEvent",
    didNotAttendEE: "DidNotAttendExternalEvent",
    didNotAttendMOOC: "DidNotAttendMOOC"
  },
  questionStatus: {
    active: 1,
    inActive: 2,
  },
  termModerateType: {
    accept: "ACCEPT",
    reject: "REJECT",
    merge: "MERGE",
  },
  assessmentTestStatus: {
    draft: 1,
    published: 2,
    moderation: 3,
    rejected: 4,
  },
  eventType: {
    learning: "learning",
    engagement: "engagement",
    both: "both",
    sharing: "sharing",
  },
  analyticsEventID: {
    reads: "reads",
    conversations: "conversations",
    forwards: "forwards",
    assignments: "assignments",
    playlists: "playlists",
    bookmarks: "bookmarks",
    ratings: "ratings",
    enrollCount: "enrollcount",
    certificationCount: "certificationcount",
    requestCount: "requestcount",
    nominationCount: "nominationcount",
    knowledgeBeads: "knowledgebeads",
    questions: "questions",
    answers: "answers",
    internalCertificationCount: "internalcertificationcount",
    externalCertificationCount: "externalcertificationcount",
    endorsementsGiven: "endorsementsgiven",
    knowledgeCards: "knowledgecards",
    WGRequests: "wgrequests",
    WGJoins: "wgjoins",
    WGRejects: "wgrejects",
    WGNew: "wgnew",
    WGDelete: "wgdelete",
    reassigns: "reassigns",
    follow: "follow",
    like: "like",
    feedback: "feedback",
    assignmentSubmissions: "assignmentsubmissions",
  },
  courseType: {
    internal: 1,
    external: 2,
  },
  questionType: {
    mcq: 1,
  },
  pointsBadge: {
    platinum: 1,
    gold: 2,
    silver: 3,
    bronze: 4,
    starter: 5,
  },
  tenure: {
    tenure1: "< 1 year",
    tenure2: "1 to 3 years",
    tenure3: "3 to 6 years",
    tenure4: "6 to 10 years",
    tenure5: "> 10 years",
  },
  ageGroup: {
    ageGroup1: "<25",
    ageGroup2: "25-30",
    ageGroup3: "30-40",
    ageGroup4: "40-50",
    ageGroup5: ">50",
  },
  userTestStatus: {
    live: 1,
    interrupted: 2,
    completed: 3,
    aborted: 4,
  },
  userTestQuestionStatus: {
    notAttempted: 1,
    attempted: 2,
    answered: 3,
  },
  readLogType: {
    segment: "segment",
    time: "time",
  },
  sourceWeight: {
    KB: 95,
    Answer: 95,
    IntAss: 100,
    MEnd: 90,
    PEdn: 60,
    IntCert: 80,
    ExtCert: 60,
  },
  skillSource: {
    knowledgebead: "KB",
    answers: "Answer",
    internalAssessment: "IntAss",
    managerEndorsement: "MEnd",
    peerEndorsement: "PEdn",
    internalCertification: "IntCert",
    externalCertification: "ExtCert",
  },
  userCertificateStatus: {
    published: 1,
    moderation: 2,
    reject: 3,
  },
  notificationSubscriptionType: {
    worker: 1,
    safari: 2,
  },
  manageResourceType: {
    userPost: "userpost",
    events: "events",
    editorial: "editorial"
  },
  stimulationFunctions: {
    peerEndorsement: 1,
    managerEndorsement: 2,
    resourceAssignment: 3,
    takeCourse: 4,
    askQuestion: 5,
    assignKC: 6,
    contributeKB: 7,
  },
  functionType: {
    internal: 1,
    external: 2,
  },
  userInvitationStatus: {
    invited: 1,
    registered: 2,
    revoked: 3,
    reported: 4,
  },
  mailTemplateID: {
    userInvitation: 1,
    SendOTP: 2,
    authorAnswerNotification: 'ANS01',
    msgAnswerNotification: 'ANS02',
    closeAnswerNotification: 'ANS03',
    bestAnswerToAuthors: 'ANS04',
    askerChoiceNotification: "ANS05",
    answerExpertsNotification: "ANS06",
    assignmentAssign: "AS01",
    assignmentDueForSubmission: "AS02",
    assignmentReassigned: "AS03",
    assignmentSubmitted: "AS04",
    assignmentEvaluated: "AS05",
    assignmentOverDue: "AS06",
    assignmentAuthors: "AS07",
    assignmentCompleted: "AS08",
    conversationAddResAuthors: "CNV01",
    conversationAddAnswerAuthors: "CNV02",
    courseEnrol: "CSE01",
    courseEnrolWGOwners: "CSE02",
    moderationPublished: "MOD02",
    moderationDeclined: "MOD03",
    registrationRequest: "RGS01",
    requestRegistrationApproval: "RGS02",
    requestRegistrationDeclined: "RGS03",
    requestRegistrationApprovalWG: "RGS04",
    requestRegistrationDeclinedWG: "RGS05",
    registrationDidNotAttend: "RGS06",
    registration: "RGS07",
    resourceRating: "RC09",
    resourceForward: "RC10",
    moderationSubmitted: "MOD01",
    resourceModeration: "MOD04",
    certificateModerationSubmitted: "MOD06",
    userInvite: "INV01",
    certificatePublished: "MOD08",
    certificateDeclined: "MOD09",
    WGAddInvite: "WG01",
    WGAddRequest: "WG04",
    WGRequestAccepted: "WG05",
    WGRequestDecline: "WG06",
    WGDeleteMember: "WG09",
    WGDelete: "WG10",
    WGInviteRecursive: "WG11",
    WGReqRecursive: "WG12",
    WGInviteAccepted: "WG02",
    WGInviteDeclined: "WG03",
    revokeInvitation: "WG07",
    revokeRequest: "WG08",
    quitWG: "WG13"
  },
  regLearningActivityType: {
    MOOC: 1,
    // event: 2,
    internalEvent: 2,
    externalEvent: 3,
    internalCourse: 4
  },
  registrationStatus: {
    registered: 1,
    registerLearning: 2,
    noShow: 3,
    cancel: 4,
  },
  nominationStatus: {
    pending: 0,
    approved: 1,
    declined: 2,
  },
  menu: {
    workgroups: {
      "key": "workgroups",
      "title": "workgroups",
      "svgIcon": "workgroup",
      "icon": "",
      "isVisible": false,
      "functionID": "",
      "active": false,
      "refMenu": "workgroups",
      "isHover": true,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
        "key": "workgroups",
        "active": false,
        "title": "workgroups",
        "order": 1,
        "link": "/workgroup",
        "moduleName": "Workgroup",
        "matchQueryParams": [],
        "queryParams": {
          "tab": "my_workgroups"
        },
        "svgIcon": "",
        "icon": "",
        "group": 1,
        "functionID": ["MWG004"],
        "isHover": false,
        "isPage": true,
        "isBurger": true
      }]
    },
    resources: {
      "key": "resources",
      "title": "resources",
      "svgIcon": "resource",
      "icon": "",
      "isVisible": false,
      "active": false,
      "refMenu": "kb",
      "isHover": true,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
          "key": "learningContent",
          "active": false,
          "title": "learningContent",
          "link": "/learning-content",
          "order": 1,
          "moduleName": "Resource",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["CON001", "CON002", "CON003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "kb",
          "active": false,
          "title": "kb",
          "link": "/knowledge-bead",
          "order": 2,
          "moduleName": "KnowledgeBeadModule",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "for_me"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["KB001", "KB002", "KB003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "internalEvents",
          "active": false,
          "title": "internalEvents",
          "link": "/internal-event",
          "order": 3,
          "moduleName": "InternalEvent",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all",
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["IEV001", "IEV002", "IEV003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "externalEvents",
          "active": false,
          "title": "externalEvents",
          "link": "/external-event",
          "order": 4,
          "moduleName": "ExternalEvent",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all",
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["EEV001", "EEV002", "EEV003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "courses",
          "active": false,
          "title": "courses",
          "link": "/course",
          "order": 5,
          "moduleName": "Course",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all",
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["RES002"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "mooc",
          "active": false,
          "title": "mooc",
          "link": "/mooc",
          "order": 5,
          "moduleName": "MOOC",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["MOOC001", "MOOC002", "MOOC003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "answers",
          "active": false,
          "title": "answers",
          "link": "/questions",
          "order": 5,
          "moduleName": "Questions",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all",
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["QS001", "QS002", "QS003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "playlists",
          "active": false,
          "title": "playlists",
          "order": 1,
          "link": "/playlist",
          "moduleName": "Playlists",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "for_me"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["PL001", "PL002", "PL003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        }
      ]
    },
    assignments: {
      "key": "assignments",
      "active": false,
      "order": 1,
      "title": "assignments",
      "svgIcon": "assignment",
      "icon": "",
      "isVisible": false,
      "functionID": "",
      "refMenu": "resources",
      "isHover": true,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
          "key": "resources",
          "active": false,
          "title": "resources",
          "order": 1,
          "link": "/assignment",
          "moduleName": "Assignment",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "assign_to_me"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["AGN004"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "knowledgeCards",
          "active": false,
          "title": "knowledgeCards",
          "order": 2,
          "link": "/knowledge-card",
          "moduleName": "KnowledgeCard",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "assign_to_me"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["KC004"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        }
      ]
    },
    people: {
      "key": "people",
      "title": "people",
      "svgIcon": "",
      "active": false,
      "icon": "account_circle",
      "isVisible": false,
      "refMenu": "search",
      "isHover": true,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
          "key": "search",
          "active": false,
          "title": "search",
          "link": "/people/search",
          "order": 1,
          "moduleName": "People",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "people",
          "group": 1,
          "functionID": ["VS004"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "leaderboard",
          "active": false,
          "title": "leaderboard",
          "link": "/leaderboard/list",
          "order": 2,
          "moduleName": "Leaderboard",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["LEAD004"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        }
      ]
    },
    bookmarks: {
      "key": "bookmarks",
      "active": false,
      "order": 1,
      "title": "bookmarks",
      "svgIcon": "bookmark",
      "icon": "",
      "isVisible": false,
      "group": 1,
      "functionID": "",
      "refMenu": "bookmarks",
      "isHover": true,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
        "key": "bookmarks",
        "active": false,
        "title": "bookmarks",
        "order": 1,
        "link": "/bookmark",
        "moduleName": "Bookmark",
        "matchQueryParams": [],
        "queryParams": {},
        "svgIcon": "",
        "icon": "",
        "group": 1,
        "functionID": ["VB004"],
        "isHover": false,
        "isPage": true,
        "isBurger": true
      }]
    },
    analytics: {
      "key": "analytics",
      "active": false,
      "title": "analytics",
      "svgIcon": "",
      "icon": "analytics",
      "isVisible": false,
      "refMenu": "learning",
      "isHover": false,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
          "key": "learning",
          "active": false,
          "title": "learning",
          "link": "/analytics/learning",
          "order": 1,
          "moduleName": "Analytics",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["VA001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "engagement",
          "active": false,
          "title": "engagement",
          "link": "/analytics/engagement",
          "order": 2,
          "moduleName": "Analytics",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["VA001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "sharing",
          "active": false,
          "title": "sharing",
          "link": "/analytics/engagement",
          "order": 2,
          "moduleName": "Analytics",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["VA001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "content",
          "active": false,
          "title": "content",
          "link": "/analytics/content",
          "order": 4,
          "moduleName": "Analytics",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["VA001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "skillGap",
          "active": false,
          "title": "skillGap",
          "link": "/analytics/gap",
          "order": 3,
          "moduleName": "Analytics",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["VA001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
      ]
    },
    admin: {
      "key": "admin",
      "active": false,
      "title": "admin",
      "svgIcon": "",
      "icon": "admin_panel_settings",
      "isVisible": false,
      "refMenu": "skillsCompentencies",
      "isHover": false,
      "isPage": true,
      "isBurger": true,
      "menuList": [{
          "key": "permissionGroup",
          "active": false,
          "title": "permissionGroup",
          "link": "/functional-roles",
          "order": 1,
          "moduleName": "FunctionalRoles",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["MP001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "skillsCompentencies",
          "active": false,
          "title": "skillCompetency",
          "link": "/skills-competency",
          "order": 2,
          "moduleName": "FunctionalRoles",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["RES007"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "lists",
          "active": false,
          "title": "lists",
          "link": "/master-list",
          "order": 3,
          "moduleName": "",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["RES003"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "users",
          "active": false,
          "title": "users",
          "link": "/people/list",
          "order": 4,
          "moduleName": "People",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["MU001", "BU001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "channels",
          "active": false,
          "title": "channels",
          "link": "/channels",
          "order": 5,
          "moduleName": "Channels",
          "matchQueryParams": [],
          "queryParams": {},
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["MC001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        },
        {
          "key": "promotion",
          "active": false,
          "title": "promotion",
          "link": "/promotion",
          "order": 6,
          "moduleName": "Promotion",
          "matchQueryParams": [],
          "queryParams": {
            "tab": "all"
          },
          "svgIcon": "",
          "icon": "",
          "group": 1,
          "functionID": ["MGP001"],
          "isHover": false,
          "isPage": true,
          "isBurger": true
        }
      ]
    }
  },
  hoverMenu: {
    workgroups: {
      "key": "workgroups",
      "title": "workgroups",
      "svgIcon": "workgroup",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/workgroup",
      "order": 1,
      "moduleName": "Workgroup",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "my_workgroups"
      },
      "functionID": ["MWG004"]
    },
    content: {
      "key": "content",
      "title": "content",
      "svgIcon": "learning",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/learning-content",
      "order": 1,
      "moduleName": "Resource",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "all"
      },
      "functionID": ["CON001", "CON002", "CON003"]
    },
    courses: {
      "key": "courses",
      "title": "courses",
      "svgIcon": "course",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/course",
      "order": 1,
      "moduleName": "Course",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "all"
      },
      "functionID": ["RES002"]
    },
    events: {
      "key": "events",
      "title": "events",
      "svgIcon": "events",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/internal-event",
      "order": 1,
      "moduleName": "InternalEvent",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "all"
      },
      "functionID": ["IEV001", "IEV002", "IEV003"]
    },
    answers: {
      "key": "answers",
      "title": "answers",
      "svgIcon": "question_and_answer",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/questions",
      "order": 1,
      "moduleName": "Questions",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "all"
      },
      "functionID": ["QS001", "QS002", "QS003"]
    },
    playlists: {
      "key": "playlists",
      "title": "playlists",
      "svgIcon": "playlist",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/playlist",
      "order": 1,
      "moduleName": "Playlists",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "for_me"
      },
      "functionID": ["PL001", "PL002", "PL003"]
    },
    assignments: {
      "key": "assignments",
      "title": "assignments",
      "svgIcon": "assignment",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/assignment",
      "order": 1,
      "moduleName": "Assignment",
      "matchQueryParams": [],
      "queryParams": {
        "tab": "assign_to_me"
      },
      "functionID": ["DEF001"]
    },
    people: {
      "key": "people",
      "title": "people",
      "svgIcon": "people",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/people/search",
      "order": 1,
      "moduleName": "People",
      "matchQueryParams": [],
      "queryParams": {},
      "functionID": ["DEF001"]
    },
    bookmarks: {
      "key": "bookmarks",
      "title": "bookmarks",
      "svgIcon": "bookmark",
      "icon": "",
      "isVisible": false,
      "active": false,
      "link": "/bookmark",
      "order": 1,
      "moduleName": "Bookmark",
      "matchQueryParams": [],
      "queryParams": {},
      "functionID": ["DEF001"]
    }
  },
  getUserActivityType: {
    workgroup: "workgroup"
  },
  userActivityEventIDs: [
    "read",
    "postconversation",
    "createknowledgebead",
    "postquestion",
    "postanswer",
    "rating",
    "register",
    "like",
    "assign",
    "registerlearning",
    "forward",
    "createplaylist",
    "nominateuser",
    "joininasking",
    "assignknowledgecard"
  ],
  enroledType: {
    active: 1,
    closed: 2
  },
  userType: {
    active: 1,
    deactivated: 2,
    deleted: 3
  },
  channelSubType: {
    subscribe: 1,
    donotSubscribe: 2
  },
  AWSUploadFolder: {
    profileImagePath: `/profile-pictures/`,
    thumbnail: `/thumbnail/`,
    1: `/document/`,
    2: `/video/`,
    3: `/audio/`,
    6: `/image/`,
    temp: `/temp/`,
    groupIconPath: `/group-icon/`,
    messageFilePath: `/message-file/`,
  },
  superAdmin: {
    ID: 1
  },
  subscriptionPlanType: {
    unLock: "Unlock",
    impact: "Impact",
    amplify: "Amplify"
  },
  flaggedType: {
    user: 1,
    resource: 2,
    comment: 3
  },
  abuseAction: {
    warning: 1,
    remove: 2,
    ignore: 3
  },
  flagReportType: {
    abuseReport: 1,
    abuseAction: 2
  },
  userStatus: {
    active: 1,
    inactive: 2
  },
  messageContext: {
    room: "ROOM",
    private: "PRIVATE"
  },
  inviteStatus: {
    pending: 1,
    accepted: 2,
    ignored: 3
  },
  whitelistStatus: {
    active: 1,
    invite: 2,
    inviter: 3,
    invitee: 4
  },
  groupUserType: {
    admin: 'ADMIN',
    member: 'MEMBER'
  },
  groupStatus: {
    active: 1,
    inviter: 2
  },
  groupMemberStatus: {
    active: 1,
    invitee: 2
  },
  hmsConferenceRoles: {
    trainer: 'trainer-role-8075',
    trainee: 'trainee-role-2733'
  },
  resourceGetType: {
    live: 1,
    editorial: 2,
    post: 3
  },
  hmsLiveRoles: {
    host: 'host-3245',
    participant: 'participant-5647',
    request: 'request-3223'
  },
  socketRoomPrefix: {
    user: 'ROOM_USER_',
    notification: 'NOTIFICATION_ROOM_USER_',
    group: 'GROUP_',
    liveGroup: 'LIVE_GROUP_'
  },
  coach: {
    batting: 1,
    bowling: 2,
    fielding: 3
  },
  playerFrom: {
    india: 1,
    international: 2
  },
  playerStyle: {
    left: 1,
    right: 2
  },
  playerType: {
    batting: 1,
    bowling: 2,
    fielding: 3,
    allRounder: 4,
    wicketKeeper: 5
  },
  searchType: {
    all: 1,
    posts: 2,
    people: 3,
    hashtags: 4,
    groups: 5
  },
  notificationContentType: {
    live: 1,
    featuredContent1: 2,
    featuredContent2: 3,
    pinned: 4,
    others: 5
  },
  contentGenderType: {
    male: 1,
    female: 2,
    all: 3
  },
  autoPlayVideo: {
    always: 1,
    onWifiConnectionOnly: 2,
    never: 3
  },
  itHappen: {
    always: 1,
    occassionally: 2,
    happenedOnly: 3
  },
  defaultUserProfileSettings: {
    "soundsAndNotification": {
      "messages": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "comments": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "groups": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "messageRequests": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "newFollowers": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "tags": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "shareNotification": {
        "notification": true,
        "sound": true,
        "vibration": false
      },
      "systemNotification": {
        "notification": true,
        "sound": true,
        "vibration": false
      }
    },
    "privacySettings": {
      "firstName": {
        "public": true,
        "followedByMe": true
      },
      "lastName": {
        "public": true,
        "followedByMe": true
      },
      "gender": {
        "public": true,
        "followedByMe": true
      },
      "birthday": {
        "public": true,
        "followedByMe": true
      },
      "joined": {
        "public": true,
        "followedByMe": true
      }
    },
    "videoSettings": {
      "autoPlayVideo": 1
    }
  }
};

// Keys for arrayOfObject validation
config.validationObjKeys = {
  skills: [{
      key: "skill",
      validation: {
        fld: "skill",
        isRequired: true,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "skillLevel",
      validation: {
        fld: "skillLevel",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.zero,
        maxValue: config.maximumValue.percentage,
      },
    },
  ],
  authors: [{
      key: "id",
      validation: {
        fld: "id",
        isRequired: false,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "Name",
      validation: {
        fld: "Name",
        isRequired: false,
        type: config.validationType.String,
      },
    },
  ],
  resource: [{
      key: "link",
      validation: {
        fld: "link",
        isRequired: false,
        type: config.validationType.String,
      },
    },
    {
      key: "thumbnail",
      validation: {
        fld: "thumbnail",
        isRequired: false,
        type: config.validationType.String,
      },
    },
    {
      key: "innerHtml",
      validation: {
        fld: "innerHtml",
        isRequired: false,
        type: config.validationType.String,
      },
    },
    {
      key: "duration",
      validation: {
        fld: "duration",
        isRequired: false,
        type: config.validationType.RegEx,
        pattern: config.regexPattern.duration,
      },
    },
    {
      key: "bookmark",
      validation: {
        fld: "bookmark",
        isRequired: false,
        type: config.validationType.ArrayOfObject,
        objectFormat: [{
            key: "key",
            validation: {
              fld: "key",
              isRequired: true,
              type: config.validationType.String,
            },
          },
          {
            key: "caption",
            validation: {
              fld: "caption",
              isRequired: true,
              type: config.validationType.String,
            },
          },
          {
            key: "timeline",
            validation: {
              fld: "timeline",
              isRequired: true,
              type: config.validationType.Array,
            },
          },
        ],
      },
    },
    {
      key: "roomID",
      validation: {
        fld: "roomID",
        isRequired: false,
        type: config.validationType.String
      }
    },
    {
      key: "meetingURL",
      validation: {
        fld: "meetingURL",
        isRequired: false,
        type: config.validationType.String
      }
    },
    {
      key: "RTMPURL",
      validation: {
        fld: "RTMPURL",
        isRequired: false,
        type: config.validationType.String
      }
    },
    {
      key: "S3Location",
      validation: {
        fld: "S3Location",
        isRequired: false,
        type: config.validationType.String
      }
    }
  ],
  // visibility: [{
  //   key: "termID",
  //   validation: {
  //     fld: "termID",
  //     isRequired: true,
  //     type: config.validationType.ArrayOfInteger,
  //   },
  // }],
  skillToCompetency: [{
      key: "id",
      validation: {
        fld: "id",
        isRequired: false,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "Name",
      validation: {
        fld: "Name",
        isRequired: false,
        type: config.validationType.String,
      },
    },
  ],
  references: [{
      key: "thumbnail",
      validation: {
        fld: "thumbnail",
        isRequired: true,
        type: config.validationType.String,
      },
    },
    {
      key: "url",
      validation: {
        fld: "url",
        isRequired: true,
        type: config.validationType.String,
      },
    },
    {
      key: "name",
      validation: {
        fld: "name",
        isRequired: true,
        type: config.validationType.String,
      },
    },
  ],
  addEndorsementKey: [{
      key: "userID",
      validation: {
        fld: "userID",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer,
      },
    },
    {
      key: "skillID",
      validation: {
        fld: "skillID",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer,
      },
    },
    {
      key: "skillLevel",
      validation: {
        fld: "skillLevel",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.zero,
        maxValue: config.maximumValue.percentage,
      },
    },
  ],
  questionDetails: [{
      key: "options",
      validation: {
        fld: "options",
        isRequired: true,
        type: config.validationType.ArrayOfObject,
        objectFormat: [{
            key: "index",
            validation: {
              fld: "index",
              isRequired: true,
              type: config.validationType.Integer,
            },
          },
          {
            key: "option",
            validation: {
              fld: "option",
              isRequired: true,
              type: config.validationType.String,
            },
          },
        ],
      },
    },
    {
      key: "rightOption",
      validation: {
        fld: "rightOption",
        isRequired: true,
        type: config.validationType.Integer,
      },
    },
  ],
  analyticsSkills: [{
      key: "key",
      validation: {
        fld: "key",
        isRequired: true,
        type: config.validationType.Integer,
      },
    },
    {
      key: "value",
      validation: {
        fld: "value",
        isRequired: true,
        type: config.validationType.String,
      },
    },
    {
      key: "competencies",
      validation: {
        fld: "competencies",
        isRequired: true,
        type: config.validationType.ArrayOfInteger,
      },
    },
  ],
  analyticsKeywords: [{
      key: "key",
      validation: {
        fld: "key",
        isRequired: true,
        type: config.validationType.Integer,
      },
    },
    {
      key: "value",
      validation: {
        fld: "value",
        isRequired: true,
        type: config.validationType.String,
      },
    },
  ],
  analyticsAuthors: [{
      key: "userID",
      validation: {
        fld: "userID",
        isRequired: true,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "name",
      validation: {
        fld: "name",
        isRequired: true,
        type: config.validationType.String,
      },
    },
  ],
  userLog: [
    // {
    //   key: "functionalRoleID",
    //   validation: {
    //     fld: "functionalRoleID",
    //     isRequired: true,
    //     type: config.validationType.Integer,
    //     minValue: config.minimumValue.one,
    //     maxValue: config.maximumValue.integer,
    //   },
    // },
    // {
    //   key: "departmentID",
    //   validation: {
    //     fld: "departmentID",
    //     isRequired: false,
    //     type: config.validationType.Integer,
    //     minValue: config.minimumValue.one,
    //     maxValue: config.maximumValue.integer,
    //   },
    // },
    {
      key: "countryID",
      validation: {
        fld: "countryID",
        isRequired: false,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer,
      },
    },
    {
      key: "locationID",
      validation: {
        fld: "locationID",
        isRequired: false,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
    },
    {
      key: "cityID",
      validation: {
        fld: "cityID",
        isRequired: false,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
    },
    {
      key: "genderID",
      validation: {
        fld: "genderID",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
    },
    {
      key: "count",
      validation: {
        fld: "count",
        isRequired: true,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "timeStamp",
      validation: {
        fld: "timeStamp",
        isRequired: true,
        type: config.validationType.Integer,
        maxLength: config.variableLength.bigint,
      },
    },
  ],
  resourceSetting: [{
      key: "rating",
      validation: {
        fld: "rating",
        isRequired: false,
        type: config.validationType.Boolean,
      },
    },
    {
      key: "forwarding",
      validation: {
        fld: "forwarding",
        isRequired: false,
        type: config.validationType.Boolean,
      },
    },
    {
      key: "flagging",
      validation: {
        fld: "flagging",
        isRequired: false,
        type: config.validationType.Boolean,
      },
    },
    {
      key: "assign",
      validation: {
        fld: "assign",
        isRequired: false,
        type: config.validationType.Boolean,
      },
    },
    {
      key: "commenting",
      validation: {
        fld: "commenting",
        isRequired: false,
        type: config.validationType.String,
        preferredValue: Object.values(config.resourceSettings.commenting),
      },
    },
    {
      key: "visibility",
      validation: {
        fld: "visibility",
        isRequired: false,
        type: config.validationType.JSON,
        objectFormat: [{
            key: "department",
            validation: {
              fld: "department",
              isRequired: false,
              type: config.validationType.ArrayOfInteger,
            },
          },
          {
            key: "country",
            validation: {
              fld: "country",
              isRequired: false,
              type: config.validationType.ArrayOfInteger,
            },
          },
          {
            key: "functionalRole",
            validation: {
              fld: "functionalRole",
              isRequired: false,
              type: config.validationType.ArrayOfInteger,
            },
          },
          {
            key: "user",
            validation: {
              fld: "user",
              isRequired: false,
              type: config.validationType.ArrayOfInteger,
            }
          },
          {
            key: "workgroup",
            validation: {
              fld: "workgroup",
              isRequired: false,
              type: config.validationType.ArrayOfInteger,
            }
          }
        ],
      },
    },
  ],
  visibility: [{
      key: "user",
      validation: {
        fld: "user",
        isRequired: false,
        type: config.validationType.ArrayOfInteger,
      },
    },
    {
      key: "workGroup",
      validation: {
        fld: "workGroup",
        isRequired: false,
        type: config.validationType.ArrayOfInteger,
      },
    },
    {
      key: "channel",
      validation: {
        fld: "channel",
        isRequired: false,
        type: config.validationType.ArrayOfInteger,
      }
    }
  ],
  internalAssessmentSkills: [{
      key: "skillID",
      validation: {
        fld: "skillID",
        isRequired: true,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "skillLevel",
      validation: {
        fld: "skillLevel",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.zero,
        maxValue: config.maximumValue.percentage,
      },
    },
  ],
  resourceSkills: [{
      key: "skill",
      validation: {
        fld: "skill",
        isRequired: false,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "skillName",
      validation: {
        fld: "skillName",
        isRequired: false,
        type: config.validationType.String,
      },
    },
    {
      key: "skillLevel",
      validation: {
        fld: "skillLevel",
        isRequired: false,
        type: config.validationType.Integer,
        minValue: config.minimumValue.zero,
        maxValue: config.maximumValue.percentage,
      },
    },
  ],
  certificateSkills: [{
      key: "skill",
      validation: {
        fld: "skill",
        isRequired: false,
        type: config.validationType.Integer,
        maxLength: config.variableLength.integer,
      },
    },
    {
      key: "skillName",
      validation: {
        fld: "skillName",
        isRequired: false,
        type: config.validationType.String
      },
    },
    {
      key: "skillLevel",
      validation: {
        fld: "skillLevel",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.zero,
        maxValue: config.maximumValue.percentage,
      },
    },
  ],
  promotionOrder: [{
      key: "dataID",
      validation: {
        fld: "dataID",
        isRequired: true,
        type: config.validationType.Integer,
        minValue: config.minimumValue.one,
        maxValue: config.maximumValue.integer
      },
    },
    {
      key: "weight",
      validation: {
        fld: "weight",
        isRequired: true,
        type: config.validationType.Integer
      },
    }
  ],
  schedule: [{
      key: "startDate",
      validation: {
        fld: "startDate",
        isRequired: true,
        type: config.validationType.Integer,
        maxValue: config.maximumValue.bigint
      },
    },
    {
      key: "endDate",
      validation: {
        fld: "endDate",
        isRequired: true,
        type: config.validationType.Integer,
        maxValue: config.maximumValue.bigint
      },
    }
  ],
  notifyOnlyTo: [{
      key: "gender",
      validation: {
        fld: "gender",
        isRequired: true,
        type: config.validationType.Integer,
        preferredValue: Object.values(config.contentGenderType),
      },
    },
    {
      key: "followerCount",
      validation: {
        fld: "followerCount",
        isRequired: true,
        type: config.validationType.JSON,
        objectFormat: [{
            key: "from",
            validation: {
              fld: "from",
              isRequired: true,
              type: config.validationType.Integer
            },
          },
          {
            key: "to",
            validation: {
              fld: "to",
              isRequired: true,
              type: config.validationType.Integer
            },
          }
        ],
      }
    },
    {
      key: "lastVisitedUserDate",
      validation: {
        fld: "lastVisitedUserDate",
        isRequired: true,
        type: config.validationType.JSON,
        objectFormat: [{
            key: "start",
            validation: {
              fld: "start",
              isRequired: true,
              type: config.validationType.Integer,
              maxValue: config.maximumValue.bigint
            },
          },
          {
            key: "end",
            validation: {
              fld: "end",
              isRequired: true,
              type: config.validationType.Integer,
              maxValue: config.maximumValue.bigint
            },
          }
        ],
      }
    },
  ],
  soundsAndNotification: [{
      key: "notification",
      validation: {
        fld: "notification",
        isRequired: true,
        type: config.validationType.Boolean
      }
    },
    {
      key: "sound",
      validation: {
        fld: "sound",
        isRequired: true,
        type: config.validationType.Boolean
      }
    },
    {
      key: "vibration",
      validation: {
        fld: "vibration",
        isRequired: true,
        type: config.validationType.Boolean
      }
    }
  ],
  privacySettings: [{
      key: "public",
      validation: {
        fld: "public",
        isRequired: true,
        type: config.validationType.Boolean
      }
    },
    {
      key: "followedByMe",
      validation: {
        fld: "followedByMe",
        isRequired: true,
        type: config.validationType.Boolean
      }
    }
  ]
};

module.exports = config;
