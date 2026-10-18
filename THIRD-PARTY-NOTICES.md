# Third-party notices

HVAC Stuff is © 2026 Maliuhin Volodymyr (see [LICENSE.md](LICENSE.md)). It is built on open-source software. Their authors and licenses are listed below.

## Template and libraries by Nice3point

The solution structure, the build and installer projects, and the add-in skeleton of HVAC Stuff come from the **Nice3point.Revit.Templates**
(`dotnet new revit-addin-sln`) by Nice3point, <https://github.com/Nice3point/RevitTemplates>. The add-in is built with **Nice3point.Revit.Sdk**
and uses **Nice3point.Revit.Toolkit** and **Nice3point.Revit.Extensions**, which are installed with it. The coding rules in the repository follow
the rules of the template authors. Thank you, Nice3point.

| Component | Copyright | License |
|---|---|---|
| Nice3point.Revit.Templates | Copyright (c) 2021 Nice3point | MIT |
| Nice3point.Revit.Sdk | Copyright (c) 2021 Nice3point | MIT |
| Nice3point.Revit.Toolkit | Copyright (c) 2022 Nice3point | MIT |
| Nice3point.Revit.Extensions | Copyright (c) 2021 Nice3point | MIT |

## Other components installed with the add-in

| Component | Copyright | License |
|---|---|---|
| CommunityToolkit.Mvvm | (c) .NET Foundation and Contributors | MIT |
| Polyfill (source package compiled into the assemblies) | Simon Cropp and contributors | MIT |

## Tools used only to build, test, and package (not installed)

| Component | Author | License |
|---|---|---|
| ModularPipelines | Tom Longhurst | MIT |
| TUnit, Nice3point.TUnit.Revit | Tom Longhurst, Nice3point | MIT |
| WixSharp | Oleg Shilo | MIT |

Newtonsoft.Json (James Newton-King, MIT) is not installed: for Revit 2023–2024 the add-in uses the copy that Revit contains.
The Autodesk Revit API is not redistributed.

## MIT License

The components marked "MIT" above are licensed under the following terms, each with its own copyright notice listed above.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
