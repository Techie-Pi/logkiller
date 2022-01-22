# Environment Variables
You can use various environment variables to change Log Killer's behaviour

### ``WATCHER_ABSOLUTE_PATH`` **``[Required]``**
- Type: ``string``
- Description: The **absolute** path to watch.

### ``WATCHER_DEVELOPMENT_MODE``
- Type: ``boolean``
- Default Value: ``false``
- Description: Development mode changes some behaviour, that may not be desired in production, in order to
  improve the developer experience while contributing to this project

### ``WATCHER_REPLACEMENT_VALUE``
- Type: ``string``
- Default Value: ``[CENSORED]``
- Description: The string that's going to replace the _censurable_ content

### ``WATCHER_BASE_MILLISECONDS``
- Type: ``number``
- Default Value: ``500``
- Description: The base time every RegEx operation is going to have, no matter the length of the content

### ``WATCHER_REGEX_IGNORED_FILES``
- Type: ``string``
- Default Value: [``source-code``](../regex/source-code.md)
- Description: The **escaped** RegEx that's going to be used to determine what files should be ignored

### ``WATCHER_CHECK_INITIAL_FILES``
- Type: ``boolean``
- Default Value: ``true``
- Description: This determines if **all** the files from the watched path should be checked on startup

### ``WATCHER_CHARACTER_THRESHOLD_MULTITHREADING``
- Type: ``number``
- Default Value: ``500000`` (_``500_000``_)
- Description: The length that the content of any file should have in order to enable [multithreading mode](../regex/engine/multithreading.md)
