export const addLinkToDownloads = (downloadList, link) => {
  const downloadLinks = downloadList.map((linkValue) => {
    if (linkValue.value === link.value) return {
      ...link,
      loading: false,
    }
    return linkValue;
  })

  return [
    ...downloadLinks,
  ];
}

export const setLinkToDownloads = (downloadList) => {
  return ([...new Set(downloadList)]).map((linkUrl) => ({
    name: null,
    value: linkUrl,
    downloadLink: null,
    loading: true
  }));
}