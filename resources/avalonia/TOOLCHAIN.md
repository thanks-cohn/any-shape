# Portable toolchain acquisition

No installed SDK or runtime is implied. Use upstream official documentation at execution time; do not lock the architectural meaning to today's tool versions.

Inspect environment:
```sh
dotnet --info
dotnet new list avalonia
dotnet workload list
```

Acquire a currently supported .NET SDK and compatible Avalonia templates (commonly `dotnet new install Avalonia.Templates`), inspect the installed template's available CLI names and generated project shape (cross-platform template often called `avalonia.xplat`). Never assume it remains identical. Android requires the supported .NET Android workload, SDK/build tools, JDK, emulator/device, signing and Android-compatible host environment.

When creating a reproducible implementation, record exact verified versions, dependency hashes/license sources, SDK selection in global.json where applicable, package locks, installation instructions, platform host versions and complete build/launch transcripts. If the toolchain is obsolete, rebuild from the technology-neutral contract using a replacement stack instead of preserving outdated commands as sacred.

SDKs, signing secrets, NuGet caches, proprietary binaries and user credentials must not be committed inside this resource folder.
