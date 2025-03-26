export class SpritePool {
    LoadPic(name) {
    }
    Render(ttpic, worldpos, worldscale) {
        let s = ttpic.cacheobj;
        //pivot?
        s.RenderWithPivot(this.batcher, worldpos, worldscale);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlUG9vbDIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTcHJpdGVQb29sMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sVUFBVTtJQUVuQixPQUFPLENBQUMsSUFBWTtJQUVwQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQW1CLEVBQUUsUUFBaUIsRUFBRSxVQUFtQjtRQUM5RCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBa0IsQ0FBQztRQUNqQyxRQUFRO1FBQ1IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBRUoifQ==