import fetch from "isomorphic-unfetch";
import {
  HEADER,
  SUB_HEADER,
  PAGE,
  IMAGE,
  TEXT,
  LIST,
  COLLECTION_VIEW
} from "../components/block/constants";

const PAGE_ID = "d72177d8-f5c4-482e-8c14-ac771a017f95";

const createCollectionBlock = async (value, block) => {
  const collectionId = value.collection_id;
  const col = await queryCollection({
    collectionId,
    collectionViewId: value.view_ids[0]
  });

  const table = [];
  const entries = values(col.recordMap.block).filter(
    block => block.value && block.value.parent_id === value.collection_id
  );
  for (const entry of entries) {
    const props = entry.value.properties;
    if (props) {
      const [key] = Object.keys(props);
      const title = props.title[0][0]
        .toLowerCase()
        .trim()
        .replace(/[ -_]+/, "_");
      table.push([title, props[key]]);
    }
  }

  Object.assign(block, { table });
  return col.recordMap.collection[collectionId].value.name[0][0];
};

export default async function getNotionData() {
  const data = await loadPageChunk({ pageId: PAGE_ID });
  const blocks = values(data.recordMap.block);

  const nodes = [];
  const tables = {};

  let currentSection = null;

  for (const block of blocks) {
    const { value } = block;
    const { type } = value;
    const blockObj = { type };

    switch (type) {
      case PAGE:
        Object.assign(blockObj, {
          children: value.properties.title,
          src: `/image.js?url=${encodeURIComponent(value.format.page_icon)}`
        });
        break;
      case HEADER:
      case SUB_HEADER:
      case TEXT:
        const children = (value.properties && value.properties.title) || null;
        Object.assign(blockObj, { children });
        break;
      case IMAGE:
        Object.assign(blockObj, {
          src: `/image.js?url=${encodeURIComponent(
            value.format.display_source
          )}`
        });
        break;
      case LIST:
        Object.assign(blockObj, {
          children: value.properties.title
        });
        break;
      case COLLECTION_VIEW:
        const collectionName = await createCollectionBlock(value, blockObj);
        tables[collectionName] = blockObj;
        break;
    }
    nodes.push(blockObj);
  }

  return { blocks: nodes, tables };
}

async function rpc(fnName, body = {}) {
  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
}

async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw());
}

function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {}
}) {
  const {
    limit = 70,
    loadContentCover = true,
    type = "table",
    userLocale = "en",
    userTimeZone = "America/Los_Angeles"
  } = loader;

  const {
    aggregate = [
      {
        aggregation_type: "count",
        id: "count",
        property: "title",
        type: "title",
        view_type: "table"
      }
    ],
    filter = [],
    filter_operator = "and",
    sort = []
  } = query;

  return rpc("queryCollection", {
    collectionId,
    collectionViewId,
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort
    }
  });
}

function loadPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false
}) {
  return rpc("loadPageChunk", {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns
  });
}

function values(obj) {
  const vals = [];
  for (const key in obj) {
    vals.push(obj[key]);
  }
  return vals;
}
