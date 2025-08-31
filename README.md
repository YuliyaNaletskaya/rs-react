# React Performance

#### Initial performance

Commit Duration
![First render](src/assets/image.png)
![Components](src/assets/image-4.png)

Flame Graph and Render Duration
![First render](src/assets/image-2.png)

Ranked Chart
![Sorted list](src/assets/image-3.png)

#### After splitting CO2DataView into separate components, performance deteriorated and loading time increased

Commit Duration
![First render](src/assets/image-5.png)
![Components](src/assets/image-6.png)

Flame Graph and Render Duration
![First render](src/assets/image-7.png)

Ranked Chart
![Sorted list](src/assets/image-8.png)

#### After adding React.memo to CountryList and CountryTable, performance improved, loading time decreased

Commit Duration
![First render](src/assets/image-9.png)
![Components](src/assets/image-10.png)

Flame Graph and Render Duration
![First render](src/assets/image-11.png)

Ranked Chart
![Sorted list](src/assets/image-12.png)
