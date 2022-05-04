const TASK_BLOCK_TYPE = {
  schemaVersion: "1.0.0",
  description: "",
  status: "",
  priority: "",
  deadline: "",
  estimation: "",
  labels: [],
  sessions: [],
  milestiones: [],
  isRecurrent: {
    date: "",
    time: "",
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  },

  isArchived: false,
  blocks: [],

  sessionsTotalTime: 0,
};

const SIMPLE_BLOCK_TYPE = {
  schemaVersion: "1.0.0",
  simpleType: "",
  // todo
  check: false,
  // list
  listType: "none",
  listItems: [],
  // toggle
  blocks: [],
  // link
  url: "none",
  // media
  mediaType: "none",
  url: "none",
  // sync
  path: "none",
  blockId: "none",
  // page
  blocks: [],
};

const COMPLEX_BLOCK_TYPE = {
  schemaVersion: "1.0.0",
  boards: [
    {
      boardName: String,
      order: null,
      color: "#fff",
      status: null,

      cards: [
        {
          blockId: "",
          name: null,
          deadline: Date,
          // task
        },
      ],
    },
  ],

  weeks: [
    {
      startDate: Date,
      endDate: Date,
      days: {
        monday: [{ blockId: "", name: null }],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    },
  ],

  calendar: {
    calendarView: "month",
    blocks: [
      {
        blockId: "",
        name: null,
        date: Date,
        startTime: Date,
        endTime: Date,
        // task
      },
    ],
  },

  table: {
    rows: [
      {
        blockId: "",
        name: null,
        order: null,
        // task
      },
    ],
  },
};

module.exports = { TASK_BLOCK_TYPE, SIMPLE_BLOCK_TYPE, COMPLEX_BLOCK_TYPE };
