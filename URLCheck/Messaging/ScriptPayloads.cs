namespace URLCheck.Messaging;

// Bodies for the scripts.* messages. The scripts page lists, edits and imports scripts, and shows
// what they printed or failed with.

/// <summary>Payload for the messages that name one script.</summary>
internal sealed record ScriptNameRequest(string? Name);

/// <summary>One script in the list.</summary>
internal sealed record ScriptEntryPayload(string Name, long Size, DateTime Modified, string? Error);

/// <summary>Body for <c>scripts.list</c>: the scripts and the folder they live in.</summary>
internal sealed record ScriptListPayload(IReadOnlyList<ScriptEntryPayload> Scripts, string Directory);

/// <summary>Body for <c>scripts.read</c>.</summary>
internal sealed record ScriptContentPayload(string Name, string Content);

/// <summary>Payload for <c>scripts.save</c>: the file to write and its new source.</summary>
internal sealed record ScriptSaveRequest(string? Name, string? Content);

/// <summary>Payload for <c>scripts.download</c>: where the script comes from.</summary>
internal sealed record ScriptDownloadRequest(string? Url);

/// <summary>Payload for <c>scripts.test</c>: the script to run, the URL to try it on, and the source to use.</summary>
internal sealed record ScriptTestRequest(string? Name, string? Url, string? Content);

/// <summary>Body for <c>scripts.test</c>: the URL it produced, any failure, and what it printed.</summary>
internal sealed record ScriptTestPayload(string Url, string? Error, IReadOnlyList<string> Output);

/// <summary>Body for the messages that only report whether they worked.</summary>
internal sealed record ScriptResultPayload(bool Ok, string? Error);

/// <summary>One line of script output, as the scripts page shows it.</summary>
internal sealed record ScriptLogPayload(string Time, string Level, string Script, string Message);

/// <summary>Body for <c>scripts.logs</c>.</summary>
internal sealed record ScriptLogsPayload(IReadOnlyList<ScriptLogPayload> Entries);
