# Multi-threaded RegEx Runner
Multithreading mode is a mode that's enabled when the file to analyze is bigger than ``x`` size (where ``x`` is
a user defined number of milliseconds or ``500_000ms``)

## How does it work
### High-Level
When the threshold is trespassed, multiple threads are created, and each of them are assigned a portion of the
text. When every thread has ended processing everything, the fragments are joined together and returned to the
caller

### Low-Level
- [``[Code Link]``](../../../src/replacer/regexRunner/index.ts)

When a new string is sent to the ``run(...)`` function and the parameters are calculated (timeout, length...)
a check is made to check if the threshold is trespassed or not.

If the threshold is indeed trespassed, ``spawnMultipleWorkers(...)`` is called.

This function created ``n - 1`` [workers](https://nodejs.org/api/worker_threads.html) (each worker is executed on a
separate thread).

When the worker is created, the main thread sends to the spawned ones the 
[patters and flags](https://javascript.info/regexp-introduction) of the RegEx to evaluate, the fragment of the string to
evaluate and what should the matching values be replaced for.

After this, the RegExp is created at the thread with
[the previous parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp).

Then a [``vm``](https://nodejs.org/api/vm.html) is created to add a timeout to the RegExp execution.
All the data is bundled into a 
[context](https://nodejs.org/api/vm.html#vmcreatecontextcontextobject-options) that's sent to the ``vm``.

Since the ``vm`` is not async, the result is checked after the execution, then is sent to the main thread.

The results from the worker are saved based on a numeric ID, this triggers a function in the main thread to
check if there are any values missing.

If there isn't any value missing, the strings are put back together using the numeric IDs to determine the order.

The promise from ``spawnMultipleWorkers(...)`` is resolved with the string, or rejected if any error is thrown
at any point.

This process looks something like this
```
|- main
    ^
    |- async spawnMultipleWorkers(...)
        ^
        |- worker #1 (-2o)
        |- worker #2 (-3o)
        |- worker #3 (-1o)
        |- worker #4 (-4o)
```
